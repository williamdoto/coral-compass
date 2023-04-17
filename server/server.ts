import express from "express";
import { connectToDatabase } from "./services/database.service";
import bodyParser from "body-parser";
import * as account from "../src/routers/account";
import * as general from "../src/routers/general";
import * as species from "../src/routers/taxon";

connectToDatabase();

const app = express();
// app.use("/", express.static(path.join(__dirname, "../dist/public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const PORT = process.env['PORT'] || 4000;

app.post("/api/login", account.loginValidate, account.createAccount);

app.post("/api/check", account.loginValidate, account.checkAccount);
app.post('/api/account', account.createAccount);
app.get('/api/account/:email', account.findAccount);
app.get('/api/general', general.findLocation);
app.get('/api/scientific-names', species.countScientificNames);

app.listen(PORT, () => console.log(`⚡Server is running here 👉 http://localhost:${PORT}`));