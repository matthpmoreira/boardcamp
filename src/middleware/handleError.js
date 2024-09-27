import http from "http-status";
import { ConflictError, NotFoundError } from "#errors";

export function handleError(err, req, res, next) {
    if (err instanceof ConflictError) {
        res.status(http.CONFLICT).send(err.message);
    } else if (err instanceof NotFoundError) {
        res.status(http.NOT_FOUND).send(err.message);
    } else {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}
