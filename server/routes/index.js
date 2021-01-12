const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const { Card } = require("../models");

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
    const cards = rows.map((row) => Card(row));
    res.send(cards);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
