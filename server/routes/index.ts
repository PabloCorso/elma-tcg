import express from "express";
import { Pool } from "pg";
import { Card, Effect, CardType } from "../models";

const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const selectCardsQuery = `
SELECT c.*, e.*, c.name, e.name as effect_name
FROM
  cards AS c
  INNER JOIN cards_effects AS ce ON ce.card_id = c.id
  INNER JOIN effects AS e ON e.id = ce.effect_id
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

const getCreateCardQuery = (card: CardType) => {
  return `
INSERT INTO cards (name, card_type, type1, type2, pr1, pr2, pr3, pr4, pr5, pr6, battle_length_min, battle_length_max, set_name, collector_number, rarity) VALUES (${card.name}, ${card.cardType}, ${card.type1}, ${card.type2}, ${card.pr1}, ${card.pr2}, ${card.pr3}, ${card.pr4}, ${card.pr5}, ${card.pr6}, ${card.flavorText}, ${card.battleLengthMin}, ${card.battleLengthMax}, ${card.setName}, ${card.collectorNumber}, ${card.rarity});

SELECT last_value FROM cards_id_seq;
`;
};

router.post("api/v1.0/card", async (req, res) => {
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

export default router;
