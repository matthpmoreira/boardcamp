import { Router } from "express";
import { gamesController } from "#controllers";
import { validateSchema } from "#middleware";
import { gameSchema } from "#schemas";

export const gamesRouter = Router();
gamesRouter.get("/games", gamesController.listGames);
gamesRouter.post("/games", validateSchema(gameSchema), gamesController.createGame);
