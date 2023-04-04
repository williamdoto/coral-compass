import express from "express";
import * as bcrypt from "bcrypt";
import config from "../../server/config.json";

import { Account } from "../models/account";

export const createAccount = async function (req: express.Request, res: express.Response) {
    // Hash the password
    bcrypt.hash(req.body.password, config.mongoDB.bcryptSaltRounds, async function (err, hash) {
        // The password has been hashed, store it in the database.
        let theAccount = new Account({ username: req.body.username, email: req.body.email, password: hash });
        try {
            const docs = await Account.find({ 'email': theAccount.email });
            if (docs.length === 0) {
                try {
                    await theAccount.save();
                    console.log('User saved successfully');
                } catch (error) {
                    console.error('Error saving user:', error);
                }
            } else {
                console.log("Duplicate user found");
            }
        } catch (error) {
            console.error('Error fetching account:', error);
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

// export const checkAccount = function (req: express.Request, res: express.Response) {
//     const accountEmail = req.body.email;
//     console.log(`Email: ${accountEmail}`);
//     Account.findOne({ 'email': accountEmail }).exec()
//         .catch(reason => res.json(`Failed for reason '${reason}'`))
//         .then(function(result:AccountDoc | null) {
//             res.json(result);
//         });
// };