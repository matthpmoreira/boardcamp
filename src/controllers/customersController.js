import { customersService } from "#services";

async function listCustomers(req, res) {
    const customers = await customersService.listCustomers();
    res.send(customers);
}

export const customersController = {
    listCustomers,
}
