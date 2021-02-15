import express from "express";
import { Pool, QueryConfig } from "pg";
import { CardFromDb, Effect, CardType, EffectType } from "../models";
import { QueryParams, getInsertQuery, getMultiInsertQuery } from "./queryUtils";

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
  SELECT c.*, e.*, c.name, e.name as effect_name
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

  const getInsertCardQuery = (card: CardType) => {
    const params: QueryParams = [
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
    ];
    return getInsertQuery({ tableName: "cards", params, returnId: true });
  };

  const getInsertEffectQuery = (effect: EffectType) => {
    const params: QueryParams = [
      { name: "name", value: effect.name },
      { name: "text", value: effect.text },
      { name: "italic_text", value: effect.italicText },
    ];
    return getInsertQuery({ tableName: "effects", params, returnId: true });
  };

  const getInsertCardEffectsQuery = (cardId: number, effectIds: number[]) => {
    const paramsGroup: QueryParams[] = [];
    for (let i = 0; i < effectIds.length; i++) {
      const effectId = effectIds[i];
      const params: QueryParams = [
        { name: "card_id", value: cardId },
        { name: "effect_id", value: effectId },
        { name: "position", value: i },
      ];
      paramsGroup.push(params);
    }

    return getMultiInsertQuery({
      tableName: "cards_effects",
      paramsGroup,
    });
  };

  router.post("/api/v1.0/card", async (req, res) => {
    const body = req.body as CardType;
    const client = await pool.connect();

    let result: SaveCardResult;
    try {
      await client.query("BEGIN");

      const cardResult = await client.query(getInsertCardQuery(body));
      const newCardId = cardResult.rows[0].id;

      const effectIds = [];
      if (body.effects && body.effects.length > 0) {
        for (const effect of body.effects) {
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
    const params: QueryParams = [
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
    ];
    return getInsertQuery({ tableName: "cards", params, returnId: true });
  };

  router.put("/api/v1.0/card", async (req, res) => {
    const body = req.body as CardType;
    const client = await pool.connect();

    let result: SaveCardResult;
    try {
      await client.query("BEGIN");

      const cardResult = await client.query(getInsertCardQuery(body));
      const newCardId = cardResult.rows[0].id;

      const effectIds = [];
      if (body.effects && body.effects.length > 0) {
        for (const effect of body.effects) {
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

  return router;
};

export default cardRoutes;
