import http from "http-status";

export function validateSchema(schema) {
    return (req, res, next) => {
        const result = schema.validate(req.body, { abortEarly: false });

        if (result.error) {
            const messages = result.error.details.map(detail => detail.message);
            return res.status(http.BAD_REQUEST).send(messages);
        }

        next();
    }
}
