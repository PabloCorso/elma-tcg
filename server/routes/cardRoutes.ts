import express from "express";
import { Pool, QueryConfig } from "pg";
import {
  CardFromDb,
  Effect,
  CardType,
  EffectType,
  CardEffectType,
  Card,
} from "../models";
import {
  QueryParams,
  getInsertQuery,
  getMultiInsertQuery,
  getUpdateQuery,
} from "./queryUtils";

export type SaveCardResult = {
  cardId?: number;
  effectIds?: number[];
  error?: string;
};

const cardRoutes = (pool: Pool) => {
  const router = express.Router();

  const selectCardsQuery = `
SELECT c.*, e.*, c.name, e.id as effect_id, e.name as effect_name
FROM
  cards AS c
  LEFT OUTER JOIN cards_effects AS ce ON ce.card_id = c.id
  LEFT OUTER JOIN effects AS e ON e.id = ce.effect_id
ORDER BY ce.position
`;

  const readCardsFromRows = (rows: any[]) => {
    const cards = [];
    let currentCardName = "";
    for (const row of rows) {
      if (currentCardName !== row.name) {
        cards.push(CardFromDb(row));
        currentCardName = row.name;
      }

      if (row.effect_name) {
        const effect = Effect({
          id: row.effect_id,
          name: row.effect_name,
          text: row.text,
          italicText: row.italic_text,
        });
        const currentCard = cards[cards.length - 1];
        currentCard.effects.push(effect);
      }
    }

    return cards;
  };

  router.get("/api/v1.0/cards", async (_req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query(selectCardsQuery);
      const rows = result.rows || [];
      const cards = readCardsFromRows(rows);
      res.send({ cards });
      client.release();
    } catch (error) {
      console.error(error);
      res.send({ error });
    }
  });

  const selectCardByIdQuery = (cardId: number): QueryConfig => ({
    text: `
  SELECT c.*, e.*, c.name, e.id as effect_id, e.name as effect_name
  FROM
    cards AS c
    LEFT OUTER JOIN cards_effects AS ce ON ce.card_id = c.id
    LEFT OUTER JOIN effects AS e ON e.id = ce.effect_id
  WHERE c.id = $1
  ORDER BY ce.position
  `,
    values: [cardId],
  });

  router.get("/api/v1.0/card/:cardId", async (req, res) => {
    try {
      const cardId = Number(req.params.cardId);

      const client = await pool.connect();
      const result = await client.query(selectCardByIdQuery(cardId));
      const rows = result.rows || [];
      const cards = readCardsFromRows(rows);
      res.send({ card: cards[0] });
      client.release();
    } catch (error) {
      console.error(error);
      res.send({ error });
    }
  });

  const getCardQueryParams = (card: CardType) => {
    return [
      { name: "name", value: card.name },
      { name: "card_type", value: card.cardType },
      { name: "type1", value: card.type1 },
      { name: "type2", value: card.type2 },
      { name: "pr1", value: card.pr1 },
      { name: "pr2", value: card.pr2 },
      { name: "pr3", value: card.pr3 },
      { name: "pr4", value: card.pr4 },
      { name: "pr5", value: card.pr5 },
      { name: "pr6", value: card.pr6 },
      { name: "battle_length_min", value: card.battleLengthMin },
      { name: "battle_length_max", value: card.battleLengthMax },
      { name: "flavor_text", value: card.flavorText },
      { name: "rarity", value: card.rarity },
    ] as QueryParams;
  };

  const getInsertCardQuery = (card: CardType) => {
    const params = getCardQueryParams(card);
    return getInsertQuery({ tableName: "cards", params, returning: true });
  };

  const getEffectQueryParams = (effect: EffectType) => {
    return [
      { name: "name", value: effect.name },
      { name: "text", value: effect.text },
      { name: "italic_text", value: effect.italicText },
    ] as QueryParams;
  };

  const getInsertEffectQuery = (effect: EffectType) => {
    const params = getEffectQueryParams(effect);
    return getInsertQuery({ tableName: "effects", params, returning: true });
  };

  const getUpdateEffectQuery = (effect: EffectType) => {
    const params = getEffectQueryParams(effect);
    return getUpdateQuery({ tableName: "effects", params, id: effect.id });
  };

  const getCardEffectQueryParams = ({
    cardId,
    effectId,
    position,
  }: CardEffectType) => {
    return [
      { name: "card_id", value: cardId },
      { name: "effect_id", value: effectId },
      { name: "position", value: position },
    ] as QueryParams;
  };

  const getInsertCardEffectsQuery = (cardId: number, effectIds: number[]) => {
    const paramsGroup: QueryParams[] = [];
    for (let i = 0; i < effectIds.length; i++) {
      const effectId = effectIds[i];
      const params = getCardEffectQueryParams({
        cardId,
        effectId,
        position: i,
      });
      paramsGroup.push(params);
    }

    return getMultiInsertQuery({
      tableName: "cards_effects",
      paramsGroup,
    });
  };

  router.post("/api/v1.0/card", async (req, res) => {
    const card = Card(req.body);
    const client = await pool.connect();

    let result: SaveCardResult;
    try {
      await client.query("BEGIN");

      const cardResult = await client.query(getInsertCardQuery(card));
      const newCardId = cardResult.rows[0].id;

      const effectIds = [];
      const hasEffects = card.effects && card.effects.length > 0;
      if (hasEffects) {
        for (const effect of card.effects) {
          let effectId = effect.id || 0;
          if (!effectId) {
            const result = await client.query(getInsertEffectQuery(effect));
            effectId = result.rows[0].id;
          }

          effectIds.push(effectId);
        }

        await client.query(getInsertCardEffectsQuery(newCardId, effectIds));
      }

      await client.query("COMMIT");

      result = { cardId: newCardId, effectIds };
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(error);
      result = { error };
    } finally {
      client.release();
    }

    res.send(result);
  });

  const getUpdateCardQuery = (card: CardType) => {
    const params = getCardQueryParams(card);
    return getUpdateQuery({ tableName: "cards", params, id: card.id });
  };

  const getSelectCardEffectIdsQuery = (cardId: number) => ({
    text: `
  SELECT e.id
  FROM
    cards AS c
    LEFT OUTER JOIN cards_effects AS ce ON ce.card_id = c.id
    LEFT OUTER JOIN effects AS e ON e.id = ce.effect_id
  WHERE c.id = $1
  ORDER BY ce.position
  `,
    values: [cardId],
  });

  const getDropCardEffectsQuery = ({
    cardId,
    effectIds = [],
  }: {
    cardId: number;
    effectIds: number[];
  }) => {
    const effectTexts = [];
    for (let i = 0; i < effectIds.length; i++) {
      effectTexts.push(`effect_id = $${i + 2}`);
    }

    return {
      text: `
DELETE FROM cards_effects
WHERE card_id = $1 
AND ${effectTexts.join(" AND ")}
`,
      values: [cardId, ...effectIds],
    };
  };

  const getUpdateCardEffectQuery = ({
    cardId,
    effectId,
    position,
  }: CardEffectType) => {
    return {
      text: `
      UPDATE cards_effects SET position = $3
       WHERE card_id = $1 AND effect_id = $2`,
      values: [cardId, effectId, position],
    };
  };

  const getInsertCardEffectQuery = ({
    cardId,
    effectId,
    position,
  }: CardEffectType) => {
    const params = getCardEffectQueryParams({ cardId, effectId, position });
    return getInsertQuery({
      tableName: "cards_effects",
      params,
    });
  };

  router.put("/api/v1.0/card", async (req, res) => {
    const card = Card(req.body);
    const client = await pool.connect();

    let result: SaveCardResult;
    try {
      await client.query("BEGIN");

      await client.query(getUpdateCardQuery(card));

      const resultEffectIds = await client.query(
        getSelectCardEffectIdsQuery(card.id)
      );
      const incomingEffectIds = card.effects
        .map(({ id }) => id)
        .filter((id) => Boolean(id));
      const currentEffectIds: number[] = resultEffectIds.rows.map(
        ({ id }) => id
      );

      const effectIdsToDelete = currentEffectIds.filter(
        (id) => !incomingEffectIds.includes(id)
      );

      if (effectIdsToDelete.length > 0) {
        await client.query(
          getDropCardEffectsQuery({
            cardId: card.id,
            effectIds: effectIdsToDelete,
          })
        );
      }

      const effectIds = [];
      const createdEffectIds = [];
      for (let i = 0; i < card.effects.length; i++) {
        const effect = card.effects[i];
        let effectId = effect.id || 0;
        if (effectId) {
          await client.query(getUpdateEffectQuery(effect));

          const isNewCardEffect = !currentEffectIds.includes(effectId);
          const cardEffectParams = {
            cardId: card.id,
            effectId,
            position: i,
          };
          if (isNewCardEffect) {
            await client.query(getInsertCardEffectQuery(cardEffectParams));
          } else {
            await client.query(getUpdateCardEffectQuery(cardEffectParams));
          }
        } else {
          const effectResult = await client.query(getInsertEffectQuery(effect));
          effectId = effectResult.rows[0].id;
          createdEffectIds.push(effectId);

          await client.query(
            getInsertCardEffectQuery({
              cardId: card.id,
              effectId,
              position: i,
            })
          );
        }

        effectIds.push(effectId);
      }

      await client.query("COMMIT");

      result = { cardId: card.id, effectIds: [] };
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(error);
      result = { error };
    } finally {
      client.release();
    }

    res.send(result);
  });

  return router;
};

export default cardRoutes;
