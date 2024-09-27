import { Router } from "express";
import { customersController } from "#controllers";

export const customersRouter = Router();
customersRouter.get("/customers", customersController.listCustomers);
