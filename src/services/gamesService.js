import { gamesRepository } from "#repositories";

async function listGames() {
    const result = await gamesRepository.listGames();
    return result.rows;
}

async function createGame(game) {
    const result = await gamesRepository.getGameByName(game.name);

    if (result.rowCount !== 0) {
        throw { type: "conflict", message: `A game named ${game.name} already exists` };
    }

    return gamesRepository.createGame(game);
}

export const gamesService = {
    listGames,
    createGame,
};
