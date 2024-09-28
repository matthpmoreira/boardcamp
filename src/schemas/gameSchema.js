import joi from "joi";

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().default("https://cdn-icons-png.freepik.com/512/9435/9435770.png"),
    stockTotal: joi.number().integer().positive().required(),
    pricePerDay: joi.number().integer().positive().required()
});
