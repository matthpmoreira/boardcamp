import http from "http-status";
import { ConflictError } from "#errors";

export function handleError(err, req, res, next) {
    if (err instanceof ConflictError) {
        res.status(http.CONFLICT).send(err.message);
    } else {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}
