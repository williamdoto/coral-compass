import express from "express";
import * as bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import config from "../../server/config.json";

import { Account } from "../models/account";

// https://heynode.com/tutorial/how-validate-and-sanitize-expressjs-form/
export const loginValidate = [
    check('email', 'Username Must Be an Email Address').isEmail().normalizeEmail()
    // check('password').isLength({ min: 8 })
    //     .withMessage('Password Must Be at Least 8 Characters')
    //     .matches('[0-9]').withMessage('Password Must Contain a Number')
    //     .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')];
];

export const createAccount = async function (req: express.Request, res: express.Response) {
    // Hash the password
    bcrypt.hash(req.body.password, config.bcryptSaltRounds, async function (err, hash) {
        // The password has been hashed, store it in the database.
        let theAccount = new Account({ username: req.body.username, email: req.body.email, password: hash });
        try {
            const docs = await Account.find({ 'email': theAccount.email });
            console.log(docs);
            if (docs.length === 0) {
                try {
                    await theAccount.save();
                    console.log('User saved successfully');
                    res.send('User saved successfully');
                } catch (error) {
                    console.error('Error saving user:', error);
                    res.send('Error saving user');
                }
            } else {
                console.log("Duplicate user found");
                res.send("Duplicate user found");
            }
        } catch (error) {
            console.error('Error fetching account:', error);
            res.send('Error fetching account:');
        }
        // TODO: Respond to requests
    });
};

export const findAccount = function (req: express.Request, res: express.Response) {
    const accountEmail = req.body.email;
    console.log(`Email: ${accountEmail}`);
    Account.find({ 'email': accountEmail }).exec()
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};

export const checkAccount = function (req: express.Request, res: express.Response) {
    /**
     * Function that sends a failure response. This is used to keep unkown
     * email and bad password responses ambiguous for security reasons.
     */
    function failResponse() {
        console.log(`Incorrect email or password`);
        res.json(`Incorrect email or password`);
    }

    const accountEmail = req.body.email;
    const givenPassword = req.body.password;
    console.log(`Email: ${accountEmail}`);
    Account.findOne({ 'email': accountEmail }).exec()
        .then(function (result) {
            if (result) {
                bcrypt.compare(givenPassword, result.password, async function(err, same) {
                    if (same) {
                        res.json("Success"); // TODO: Do something with this success
                    } else {
                        failResponse();
                    }
                });
            } else {
                failResponse();
            }
        })
        .catch(reason => res.json(`Failed for reason '${reason}'`))
};