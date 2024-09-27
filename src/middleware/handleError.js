import http from "http-status";
import { ConflictError, NoStockAvailableError, NotFoundError } from "#errors";

export function handleError(err, req, res, next) {
    if (err instanceof ConflictError) {
        res.status(http.CONFLICT).send(err.message);
    } else if (err instanceof NotFoundError) {
        res.status(http.NOT_FOUND).send(err.message);
    } else if (err instanceof NoStockAvailableError) {
        res.status(http.UNPROCESSABLE_ENTITY).send(err.message);
    } else {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}
