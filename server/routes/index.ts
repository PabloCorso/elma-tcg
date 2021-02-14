import { Pool } from "pg";
import cards from "./cardRoutes";
import effects from "./effectRoutes";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const cardRoutes = cards(pool);
export const effectRoutes = effects(pool);
