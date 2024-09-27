import { rentalsService } from "#services";
import http from "http-status";

async function getRentals(req, res) {
    const rentals = await rentalsService.getRentals();
    res.send(rentals);
}

async function createRental(req, res) {
    await rentalsService.createRental(req.body);
    res.sendStatus(http.CREATED);
}

export const rentalsController = {
    getRentals,
    createRental,
}
