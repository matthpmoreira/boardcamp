import http from "http-status";
import { gamesService } from "#services";

async function listGames(req, res) {
    const games = await gamesService.listGames();
    res.send(games);
}

async function createGame(req, res) {
    await gamesService.createGame(req.body);
    res.sendStatus(http.CREATED);
}

export const gamesController = {
    listGames,
    createGame,
};
