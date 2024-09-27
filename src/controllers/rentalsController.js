import { rentalsService } from "#services";
import http from "http-status";

async function createRental(req, res) {
    await rentalsService.createRental(req.body);
    res.sendStatus(http.CREATED);
}

export const rentalsController = {
    createRental,
}
