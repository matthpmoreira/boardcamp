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

    const rentDate = getSqlDate();
    const originalPrice = rental.daysRented * game.pricePerDay;

    return rentalsRepository.createRental({ ...rental, rentDate, originalPrice });
}

async function returnRental(id) {
    const result = await rentalsRepository.getRentalById(id);
    const rental = result.rows[0];

    if (result.rowCount === 0) {
        throw new RentalNotFoundError(id);
    }

    if (rental.returnDate != null) {
        throw new RentalReturnedError(id);
    }

    const returnDate = getSqlDate();
    const game = await gamesService.getGameById(rental.gameId);
    const dayDiff = calcDayDiff(rental.rentDate, returnDate);
    const delayFee = dayDiff > rental.daysRented ? game.pricePerDay * (dayDiff - rental.daysRented) : 0;

    return rentalsRepository.returnRental(id, returnDate, delayFee);
}

function getSqlDate() {
    const date = new Date;
    const dateStr = date.toISOString();
    return dateStr.slice(0, 10);
}

function calcDayDiff(rentTimestamp, returnTimestamp) {
    const rentDate = new Date(rentTimestamp);
    const returnDate = new Date(returnTimestamp);
    const microsecDiff = returnDate - rentDate;
    return Math.floor(microsecDiff / (1000 * 60 * 60 * 24));
}

async function deleteRental(id) {
    const result = await rentalsRepository.getRentalById(id);
    const rental = result.rows[0];

    if (result.rowCount === 0) {
        throw new RentalNotFoundError(id);
    }

    if (rental.returnDate == null) {
        throw new RentalNotReturnedError(id);
    }

    return rentalsRepository.deleteRental(id);
}

export const rentalsService = {
    getRentals,
    createRental,
    returnRental,
    deleteRental,
}
