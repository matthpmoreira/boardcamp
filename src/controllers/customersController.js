import http from "http-status";
import { customersService } from "#services";

async function listCustomers(req, res) {
    const customers = await customersService.listCustomers();
    res.send(customers);
}

async function getCustomerById(req, res) {
    const { id } = req.params;
    const customer = await customersService.getCustomerById(id);
    res.send(customer);
}

async function createCustomer(req, res) {
    await customersService.createCustomer(req.body);
    res.sendStatus(http.CREATED);
}

export const customersController = {
    listCustomers,
    getCustomerById,
    createCustomer,
}
