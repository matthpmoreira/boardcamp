import { gamesService } from "#services";

async function listGames(req, res) {
    const games = await gamesService.listGames();
    res.send(games);
}

export const gamesController = {
    listGames,
};
