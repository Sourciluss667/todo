import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
// tslint:disable-next-line: no-var-requires
const bodyParser = require("body-parser");
// tslint:disable-next-line: no-var-requires
const cors = require("cors");
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(bodyParser());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", index);

app.use(errorNotFoundHandler);
app.use(errorHandler);
