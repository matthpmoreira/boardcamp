import { db } from "./database.js";

async function listCustomers() {
    return db.query(`SELECT * FROM customers;`);
}

async function getCustomerById(id) {
    return db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
}

async function getCustomerByCpf(cpf) {
    return db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
}

async function createCustomer({ name, phone, cpf }) {
    return db.query(`
        INSERT INTO customers (name, phone, cpf)
            VALUES ($1, $2, $3);
    `, [name, phone, cpf]);
}

export const customersRepository = {
    listCustomers,
    getCustomerById,
    getCustomerByCpf,
    createCustomer,
};
