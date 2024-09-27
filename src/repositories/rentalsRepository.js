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

export const rentalsRepository = {
    createRental,
    getRentalsByGameId,
    getRentals,
};
