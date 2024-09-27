import { Router } from "express";
import { gamesController } from "#controllers";

export const gamesRouter = Router();
gamesRouter.get("/games", gamesController.listGames);
gamesRouter.post("/games", gamesController.createGame);
