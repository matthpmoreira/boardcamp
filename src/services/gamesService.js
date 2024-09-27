import { gamesRepository } from "#repositories";

async function listGames() {
    const result = await gamesRepository.listGames();
    return result.rows;
}

export const gamesService = {
    listGames,
};
