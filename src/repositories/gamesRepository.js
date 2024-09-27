import { db } from "./database.js";

async function listGames() {
    return db.query(`SELECT * FROM games;`);
}

async function createGame({ name, image, stockTotal, pricePerDay }) {
    return db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);
    `, [name, image, stockTotal, pricePerDay]);
}

async function getGameByName(name) {
    return db.query(`SELECT * FROM games WHERE name = $1;`, [name]);
}

async function getGameById(id) {
    return db.query(`SELECT * FROM games WHERE id = $1;`, [id]);
}

export const gamesRepository = {
    listGames,
    createGame,
    getGameByName,
    getGameById,
};
