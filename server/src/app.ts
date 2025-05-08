import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./utils/routes";
import { deserializeUser } from "./middleware/deserealizeUser";
import cors from "cors";

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(deserializeUser)
const port = config.get<number>("port");

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
    await connect();
    routes(app);
});