import express from "express";
import { connectToDatabase } from "./services/database.service";
import bodyParser from "body-parser";
import * as account from "../src/routers/account";
import * as general from "../src/routers/general";
import * as taxon from "../src/routers/taxon";
import { urls } from "./urls";

connectToDatabase();

const app = express();
// app.use("/", express.static(path.join(__dirname, "../dist/public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const PORT = process.env['PORT'] || 4000;

app.post(urls.account.create, account.loginValidate, account.createAccount);
app.post(urls.account.check, account.loginValidate, account.checkAccount);
app.get(urls.account.find, account.findAccount);
app.get(urls.general, general.findLocation);
app.get(urls.genusCounts, taxon.countGenusValidate, taxon.countGenus);

app.listen(PORT, () => console.log(`⚡Server is running here 👉 http://localhost:${PORT}`));