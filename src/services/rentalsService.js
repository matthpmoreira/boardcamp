import { gamesService, customersService } from "#services";
import { rentalsRepository } from "#repositories";
import { NoStockAvailableError } from "#errors";

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

    const date = new Date;
    const dateStr = date.toISOString();
    const rentDate = dateStr.slice(0, 10);
    const originalPrice = rental.daysRented * game.pricePerDay;

    return rentalsRepository.createRental({ ...rental, rentDate, originalPrice });
}

export const rentalsService = {
    getRentals,
    createRental,
}
