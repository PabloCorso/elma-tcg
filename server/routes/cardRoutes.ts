import express from "express";
import { Pool } from "pg";
import { Card, Effect, CardType } from "../models";

const cardRoutes = (pool: Pool) => {
  const router = express.Router();

  const selectCardsQuery = `
SELECT c.*, e.*, c.name, e.name as effect_name
FROM
  cards AS c
  LEFT OUTER JOIN cards_effects AS ce ON ce.card_id = c.id
  LEFT OUTER JOIN effects AS e ON e.id = ce.effect_id;
`;

  router.get("/api/v1.0/cards", async (_req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query(selectCardsQuery);
      const rows = result.rows || [];

      const cards = [];
      let currentCardName = "";
      for (const row of rows) {
        if (currentCardName !== row.name) {
          cards.push(Card(row));
          currentCardName = row.name;
        }

        if (row.effect_name) {
          const effect = Effect(row);
          const currentCard = cards[cards.length - 1];
          currentCard.effects.push(effect);
        }
      }

      res.send(JSON.stringify(cards));
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

  type QueryParams = {
    name: string;
    value: string | number;
  };

  const getInsertQuery = (tableName: string, params: QueryParams[]) => {
    const names = [];
    const values = [];
    for (const param of params) {
      names.push(param.name);
      let value: string | number = "NULL";
      if (param.value) {
        value =
          typeof param.value === "string" ? `'${param.value}'` : param.value;
      }
      values.push(value);
    }

    return `INSERT INTO ${tableName} (${names.join(",")}) VALUES (${values.join(
      ","
    )});`;
  };

  const getCreateCardQuery = (card: CardType) => {
    const params = [
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
      { name: "set_name", value: card.setName },
      { name: "collector_number", value: card.collectorNumber },
      { name: "rarity", value: card.rarity },
    ];
    return `
${getInsertQuery("cards", params)}

SELECT last_value FROM cards_id_seq;
`;
  };

  router.post("/api/v1.0/card", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query(getCreateCardQuery(req.body));
      const rows = result.rows || [];

      res.send(JSON.stringify(rows[0]));
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

  return router;
};

export default cardRoutes;
