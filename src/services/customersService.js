import { CustomerConflictError, CustomerNotFoundError } from "#errors";
import { customersRepository } from "#repositories";

async function listCustomers() {
    const result = await customersRepository.listCustomers();
    return result.rows;
}

async function getCustomerById(id) {
    const result = await customersRepository.getCustomerById(id);

    if (result.rowCount === 0) {
        throw new CustomerNotFoundError(id);
    }

    return result.rows[0];
}

async function createCustomer(customer) {
    const result = await customersRepository.getCustomerByCpf(customer.cpf);

    if (result.rowCount !== 0) {
        throw new CustomerConflictError(customer.cpf);
    }

    return customersRepository.createCustomer(customer);
}

export const customersService = {
    listCustomers,
    getCustomerById,
    createCustomer,
};
