import pg from "pg";

const config = {
    connectionString: process.env.DATABASE_URL,
};

export const db = new pg.Pool(config);
