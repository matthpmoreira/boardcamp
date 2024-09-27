import { rentalsController } from "#controllers";
import { validateSchema } from "#middleware";
import { rentalSchema } from "#schemas";
import { Router } from "express";

export const rentalsRouter = Router();
rentalsRouter.post("/rentals", validateSchema(rentalSchema), rentalsController.createRental);
