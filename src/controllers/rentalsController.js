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

async function returnRental(req, res) {
    const { id } = req.params;
    await rentalsService.returnRental(id);
    res.sendStatus(http.OK);
}

async function deleteRental(req, res) {
    const { id } = req.params;
    await rentalsService.deleteRental(id);
    res.sendStatus(http.OK);
}

export const rentalsController = {
    getRentals,
    createRental,
    returnRental,
    deleteRental,
}
