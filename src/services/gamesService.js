import { gamesRepository } from "#repositories";
import { GameConflictError } from "#errors";

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

export const gamesService = {
    listGames,
    createGame,
};
