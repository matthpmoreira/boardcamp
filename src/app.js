import express, { json } from "express";
import cors from "cors";
import { gamesRouter } from "#routes";
import { handleError } from "#middleware";
import { customersRouter } from "#routes";

const app = express();
app.use(json());
app.use(cors());
app.use(gamesRouter);
app.use(customersRouter);
app.use(handleError);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Listening to port " + port)
});
