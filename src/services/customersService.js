import { customersRepository } from "#repositories";

async function listCustomers() {
    const result = await customersRepository.listCustomers();
    return result.rows;
}

export const customersService = {
    listCustomers,
};
