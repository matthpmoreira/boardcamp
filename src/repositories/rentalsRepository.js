import { db } from "./database.js";

async function createRental({ customerId, gameId, daysRented, rentDate, originalPrice }) {
    return db.query(`
        INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, null, null);
    `, [customerId, gameId, daysRented, rentDate, originalPrice]);
}

async function getRentalsByGameId(id) {
    return db.query(`SELECT * FROM rentals WHERE "gameId" = $1;`, [id]);
}

async function getRentals() {
    return db.query(`SELECT * FROM rentals;`);
}

async function getRentalById(id) {
    return db.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);
}

async function returnRental(id, returnDate, delayFee) {
    return Promise.all([
        db.query(`UPDATE rentals SET "returnDate" = $2 WHERE id = $1;`, [id, returnDate]),
        db.query(`UPDATE rentals SET "delayFee" = $2 WHERE id = $1;`, [id, delayFee])
    ]);
}

async function deleteRental(id) {
    return db.query(`DELETE FROM rentals WHERE id = $1;`, [id]);
}

export const rentalsRepository = {
    createRental,
    getRentalsByGameId,
    getRentals,
    getRentalById,
    returnRental,
    deleteRental,
};
