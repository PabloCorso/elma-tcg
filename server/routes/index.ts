import express from "express";
import { Pool } from "pg";
import { Card, CardEffect } from "../models/index";

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
  INNER JOIN cards_effects AS ce ON ce.card_name = c.name
  INNER JOIN effects AS e ON e.name = ce.effect_name
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
        const effect = CardEffect(row);
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

export default router;
