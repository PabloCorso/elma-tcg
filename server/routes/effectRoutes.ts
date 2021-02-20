import express from "express";
import { Pool } from "pg";
import { CardTypeEnum, EffectFromDb, EffectType } from "../models";

const effectRoutes = (pool: Pool) => {
  const router = express.Router();

  const selectEffectsQuery = `
  SELECT DISTINCT e.id, e.name, e.text, e.italic_text, c.card_type
  FROM effects as e
  LEFT OUTER JOIN cards_effects as ce ON ce.effect_id = e.id
  LEFT OUTER JOIN cards as c ON c.id = ce.card_id
  ORDER BY e.name
  `;

  router.get("/api/v1.0/effects", async (_req, res) => {
    const client = await pool.connect();
    try {
      const result = await client.query(selectEffectsQuery);
      const rows = result.rows || [];

      const effects = {
        [CardTypeEnum.KUSKI]: [],
        [CardTypeEnum.LEVEL]: [],
        [CardTypeEnum.INSTANT]: [],
        None: [],
      } as {
        [key: string]: EffectType[];
      };
      for (const row of rows) {
        const { card_type, ...effectRow } = row;
        const cardType = card_type || "None";
        const effect = EffectFromDb(effectRow);
        effects[cardType].push(effect);
      }

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
