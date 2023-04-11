import express from "express";
import { check, validationResult } from "express-validator";
import { connectToDatabase } from "./services/database.service";
import bodyParser from "body-parser";
import * as bcrypt from "bcrypt";
import config from "./config.json";
import * as account from "../src/routers/account";
import cors from 'cors';

import path from "path";


// https://heynode.com/tutorial/how-validate-and-sanitize-expressjs-form/
var loginValidate = [
    check('email', 'Username Must Be an Email Address').isEmail().normalizeEmail()
    // check('password').isLength({ min: 8 })
    //     .withMessage('Password Must Be at Least 8 Characters')
    //     .matches('[0-9]').withMessage('Password Must Contain a Number')
    //     .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')];
];

const app = express();
// app.use("/", express.static(path.join(__dirname, "../dist/public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const PORT = process.env['PORT'] || 4000;

app.use(cors());

app.post("/api/login", loginValidate, account.createAccount);
// app.post("/api/login", loginValidate, async (req: express.Request, res: express.Response) => {
//     // TODO: Enforce only 1 email in database
//     console.log("Got login request");
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.status(422).json({ errors: errors.array() });
//         return;
//     }
//     res.send("Hello from server!");
//     console.log(req.body);

//     // Hash the password
//     bcrypt.hash(req.body.password, config.mongoDB.bcryptSaltRounds, async function (err, hash) {
//         // The password has been hashed, store it in the database.
//         try {
//             const result = await collections.login?.insertOne({
//                 "username": req.body.username,
//                 "password": req.body.password,
//                 "hash": hash
//             });
//             if (result) {
//                 console.log("Added user");
//             } else {
//                 console.log("Issue adding user.");
//             }
//         } catch (error: any) {
//             console.error(error);
//         }
//     });
// });

// app.get("/api/hack3r", async (req, res) => {
//     try {
//         const logins = (await collections.login?.find({}).toArray());

//         res.status(200).send(logins);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

app.post("/api/check", loginValidate, account.checkAccount);
// app.post("/api/check", loginValidate, async (req: express.Request, res: express.Response) => {
//     const email = req.body.username;
//     console.log(`Looking up email '${email}'.\n`);
//     try {
//         const login = await collections.login?.find({ "username": email }).toArray();
//         if (login?.length) {
//             bcrypt.compare(req.body.password, login[1]['hash'], (err, result) => {
//                 res.send(`The result is: ${result}.\n`);
//             });
//         } else {
//             res.send("Can't find that email");
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

app.listen(PORT, () => console.log(`⚡Server is running here 👉 http://localhost:${PORT}`));




connectToDatabase();
app.post('/account', account.createAccount);
app.get('/account/:email', account.findAccount);