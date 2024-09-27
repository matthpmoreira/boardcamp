import { db } from "./database.js";

async function listGames() {
    return db.query(`SELECT * FROM games;`);
}

export const gamesRepository = {
    listGames,
};
