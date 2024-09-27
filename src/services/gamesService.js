import { gamesRepository } from "#repositories";
import { GameConflictError, GameNotFoundError } from "#errors";

async function listGames() {
    const result = await gamesRepository.listGames();
    return result.rows;
}

async function createGame(game) {
    const result = await gamesRepository.getGameByName(game.name);

    if (result.rowCount !== 0) {
        throw new GameConflictError(game.name);
    }

    return gamesRepository.createGame(game);
}

async function getGameById(id) {
    const result = await gamesRepository.getGameById(id);

    if (result.rowCount === 0) {
        throw new GameNotFoundError(id);
    }

    return result.rows[0];
}

export const gamesService = {
    listGames,
    createGame,
    getGameById,
};
