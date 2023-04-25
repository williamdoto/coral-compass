import express from "express";
import session from "express-session";
import { connectToDatabase } from "./services/database.service";
import bodyParser from "body-parser";
import * as account from "../src/routers/account";
import * as general from "../src/routers/general";
import * as taxon from "../src/routers/taxon";
import { urls } from "./urls";
import config from "./config.json";
import path from "path";

connectToDatabase();

const app = express();

// Serve the built angular project if running in production mode
const angularPath = path.join(__dirname, "../../coral-reef-monitor");
app.use("/", express.static(angularPath));

// Initialise session variables.
const sesh:session.SessionOptions = {
    secret: config.sessionSecret,
    cookie: {
        maxAge: 3600000*24 // 1 day
    },
    resave: false,
    saveUninitialized: false
}
app.use(session(sesh));

// Setup parsing request bodies.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Various routes that the server will handle. These should all start with '/api/' for the development 
app.post(urls.account.create, account.loginValidate, account.createAccount);
app.post(urls.account.login, account.loginValidate, account.login);
app.get(urls.account.find, account.findAccount);
app.get(urls.general, general.findLocation);
app.get(urls.genusCounts, taxon.countGenusValidate, taxon.countGenus);

app.listen(config.port, () => console.log(`⚡Server is running here 👉 http://localhost:${config.port}`));