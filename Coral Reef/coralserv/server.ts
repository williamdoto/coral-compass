import express from "express";
import { check, validationResult } from "express-validator";
import { connectToDatabase, collections } from "./services/database.service";
import bodyParser from "body-parser";

// https://heynode.com/tutorial/how-validate-and-sanitize-expressjs-form/
var loginValidate = [
    check('username', 'Username Must Be an Email Address').isEmail().normalizeEmail()
    // check('password').isLength({ min: 8 })
    //     .withMessage('Password Must Be at Least 8 Characters')
    //     .matches('[0-9]').withMessage('Password Must Contain a Number')
    //     .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')];
];

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.post("/login", loginValidate, async (req: express.Request, res: express.Response) => {
    console.log("Got login request");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    res.send("Hello from server!");
    console.log(req.body);

    try {
        const result = await collections.login?.insertOne({
            "username": req.body.username,
            "password": req.body.password
        });
        if (result) {
            console.log("Added user");
        } else {
            console.log("Issue adding user.");
        }
    } catch (error: any) {
        console.error(error);
    }
});

app.get("/hack3r", async (req, res) => {
    try {
        const games = (await collections.login?.find({}).toArray());
 
         res.status(200).send(games);
     } catch (error) {
         res.status(500).send(error);
     }
});

app.listen(PORT, () => console.log(`⚡Server is running here 👉 http://localhost:${PORT}`));

connectToDatabase();