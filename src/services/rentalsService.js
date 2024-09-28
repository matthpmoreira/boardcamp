import { gamesService, customersService } from "#services";
import { rentalsRepository } from "#repositories";
import {
    NoStockAvailableError,
    RentalNotFoundError,
    RentalNotReturnedError,
    RentalReturnedError
} from "#errors";

async function getRentals() {
    const result = await rentalsRepository.getRentals();
    const rentals = result.rows;

    for (const rental of rentals) {
        const game = await gamesService.getGameById(rental.gameId);
        const customer = await customersService.getCustomerById(rental.customerId);

        delete rental.gameId;
        delete rental.customerId;

        rental.game = {
            id: game.id,
            name: game.name
        };

        rental.customer = {
            id: customer.id,
            name: customer.name
        };
    }

    return rentals;
}

async function createRental(rental) {
    const rentals = await rentalsRepository.getRentalsByGameId(rental.gameId);
    const game = await gamesService.getGameById(rental.gameId);
    const allGamesRented = rentals.rowCount === game.stockTotal

    if (allGamesRented) {
        throw new NoStockAvailableError(game.id);
    }

    await customersService.getCustomerById(rental.customerId);

    const rentDate = getCurrentDateSql();
    const originalPrice = rental.daysRented * game.pricePerDay;

    return rentalsRepository.createRental({ ...rental, rentDate, originalPrice });
}

async function returnRental(id) {
    const rental = await getRentalById(id);

    if (rental.returnDate != null) {
        throw new RentalReturnedError(id);
    }

    const returnDate = getCurrentDateSql();
    const delayFee = await calcDelayFee(rental);

    return rentalsRepository.returnRental(id, returnDate, delayFee);
}

function getCurrentDateSql() {
    const date = new Date;
    const dateStr = date.toISOString();
    return dateStr.slice(0, 10);
}

async function calcDelayFee(rental) {
    const rentDate = new Date(rental.rentDate);
    const returnDate = new Date();
    const microsecDiff = returnDate - rentDate;
    const dayDiff = Math.floor(microsecDiff / (1000 * 60 * 60 * 24));
    const overdueDays = dayDiff - rental.daysRented;
    const game = await gamesService.getGameById(rental.gameId);
    return overdueDays > 0 ? game.pricePerDay * overdueDays : 0;
}

async function deleteRental(id) {
    const rental = await getRentalById(id);

    if (rental.returnDate == null) {
        throw new RentalNotReturnedError(id);
    }

    return rentalsRepository.deleteRental(id);
}

async function getRentalById(id) {
    const result = await rentalsRepository.getRentalById(id);

    if (result.rowCount === 0) {
        throw new RentalNotFoundError(id);
    }

    return result.rows[0];
}

export const rentalsService = {
    getRentals,
    createRental,
    returnRental,
    deleteRental,
}
