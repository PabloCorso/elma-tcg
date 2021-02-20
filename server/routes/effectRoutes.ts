import express from "express";
import { Pool } from "pg";
import { EffectFromDb } from "../models";

const effectRoutes = (pool: Pool) => {
  const router = express.Router();

  const selectEffectsQuery = `
  SELECT * 
  FROM effects
  ORDER BY name
  `;

  router.get("/api/v1.0/effects", async (_req, res) => {
    const client = await pool.connect();
    try {
      const result = await client.query(selectEffectsQuery);
      const rows = result.rows || [];

      const effects = rows.map((row) => EffectFromDb(row));
      res.send({ effects });
      client.release();
    } catch (error) {
      console.error(error);
      res.send({ error });
    }
  });

  return router;
};

export default effectRoutes;
