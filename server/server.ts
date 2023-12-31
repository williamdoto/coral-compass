import express from "express";
import session from "express-session";
import { connectToDatabase } from "./services/database.service";
import bodyParser from "body-parser";
import * as account from "../src/routers/account";
import * as general from "../src/routers/general";
import * as taxon from "../src/routers/taxon";
import * as catalog from "../src/routers/catalog";
import * as location from "../src/routers/location";
import * as institution from "../src/routers/institution";
import * as occurence from "../src/routers/occurence";
import * as record from "../src/routers/record";
import * as temperature from "../src/routers/temperature";
import { urls, pages } from "./urls";
import config from "./config.json";
import path from "path";

connectToDatabase();

const app = express();

// Serve the built angular project if running in production mode
if (process.env['NODE_ENV'] === "production") {
    console.log("Running in production mode. Will route requests to the angular files.");
    const angularPath = path.join(__dirname, "../../coral-reef-monitor");
    app.use("/", express.static(angularPath));

    // Get a list of angular routes
    Object.values(pages).map(route => {
        // Redirect pages to index.html as angular is a single page application.
        // Initially based on https://stackoverflow.com/a/42922998
        app.all("/" + route, function (req, res) {
            // Send the index.html for other files to support HTML5Mode
            res.sendFile('index.html', { root: angularPath });
        });
    });
} else {
    console.log("Running in development mode. Will NOT route requests to the angular files.");
}

// Initialise session variables.
const sesh: session.SessionOptions = {
    secret: config.sessionSecret,
    cookie: {
        maxAge: 3600000 * 24 // 1 day
        // secure: true
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
// Accounts
app.post(urls.account.create, account.accountCreateValidate, account.createAccount);
app.post(urls.account.login, account.loginValidate, account.login);
app.get(urls.account.find, account.findAccount);
app.get(urls.account.isLogged, account.isLoggedIn);

// General
app.get(urls.general.list, general.findLocation);
app.post(urls.general.import, general.importData);

// Taxonomy
app.get(urls.taxon.name, taxon.findSpecies);
app.get(urls.taxon.genusCounts, taxon.countPositive, taxon.countGenus);
app.get(urls.taxon.speciesCounts, taxon.validateSpeciesRequest, taxon.countSpecies);
app.get(urls.taxon.species, taxon.uniqueSpecies);
app.post(urls.taxon.insert, taxon.insertTaxon);

// Other database options
app.post(urls.institution, institution.insertInstitution);
app.post(urls.catalog, catalog.insertCatalog);
app.post(urls.location, location.insertLocation);
app.post(urls.occurence, occurence.insertOccurence);
app.post(urls.record, record.insertRecord);

// Temperature
app.get(urls.temperatures.regions, temperature.getRegions);
app.get(urls.temperatures.temperatures, temperature.getTemperatures);

// Start the server
app.listen(config.port, () => console.log(`⚡Server is running here 👉 http://localhost:${config.port}`));