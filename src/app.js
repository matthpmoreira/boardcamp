import express, {json} from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Listening to port " + port)
});
