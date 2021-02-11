import { Pool } from "pg";
import cardRoutes from "./cardRoutes";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default cardRoutes(pool);
