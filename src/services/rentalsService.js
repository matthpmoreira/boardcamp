import { gamesService, customersService } from "#services";
import { rentalsRepository } from "#repositories";
import { NoStockAvailableError } from "#errors";

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
    createRental,
}
