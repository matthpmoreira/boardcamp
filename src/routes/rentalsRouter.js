import { rentalsController } from "#controllers";
import { validateSchema } from "#middleware";
import { rentalSchema } from "#schemas";
import { Router } from "express";

export const rentalsRouter = Router();
rentalsRouter.get("/rentals", rentalsController.getRentals);
rentalsRouter.post("/rentals", validateSchema(rentalSchema), rentalsController.createRental);
rentalsRouter.post("/rentals/:id/return", rentalsController.returnRental);
rentalsRouter.delete("/rentals/:id", rentalsController.deleteRental);
