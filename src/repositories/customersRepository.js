import { db } from "./database.js";

async function listCustomers() {
    return db.query(`SELECT * FROM customers;`);
}

export const customersRepository = {
    listCustomers,
};
