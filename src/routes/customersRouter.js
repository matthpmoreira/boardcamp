import { Router } from "express";
import { customersController } from "#controllers";
import { validateSchema } from "#middleware";
import { customerSchema } from "#schemas";

export const customersRouter = Router();
customersRouter.get("/customers", customersController.listCustomers);
customersRouter.get("/customers/:id", customersController.getCustomerById);
customersRouter.post("/customers", validateSchema(customerSchema), customersController.createCustomer);
