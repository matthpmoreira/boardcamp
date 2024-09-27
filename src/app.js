import express, {json} from "express";
import cors from "cors";
import { gamesRouter } from "#routes";

const app = express();
app.use(json());
app.use(cors());
app.use(gamesRouter)

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Listening to port " + port)
});
