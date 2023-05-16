import express from "express";
import session from "express-session";
import * as bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import config from "../../server/config.json";
import { Account } from "../models/account";

// Validate login details. Based off of
// https://heynode.com/tutorial/how-validate-and-sanitize-expressjs-form/
export const loginValidate = [
    check('email', 'Username Must Be an Email Address').isEmail().trim().escape().normalizeEmail()
    // check('password').isLength({ min: 8 })
    //     .withMessage('Password Must Be at Least 8 Characters')
    //     .matches('[0-9]').withMessage('Password Must Contain a Number')
    //     .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')];
];

// The order of these indicates increasing levels of access.
export enum AccountType {
    NotLoggedIn = 0,
    User = 1 // TODO: Add more roles
}

// Based off https://github.com/expressjs/session/issues/799#issuecomment-968082380
export interface SessionData extends session.Session {
    role?: AccountType;
}

/**
 * Function that returns the current login state.
 * @param req The request to operate on.
 * @returns the state of the account.
 */
export function isLoggedIn(req: { session: SessionData }): AccountType {
    return req.session && (req.session.role ?? AccountType.NotLoggedIn);
}

/**
 * Checks if the user is logged in to the required access level. If not,
 * responds access denied and returns false. Otherwise returns true.
 * @param req The request to operate on.
 */
export function loginGuard(req: {  session: SessionData }, res: express.Response, level:AccountType): boolean {
    if (isLoggedIn(req) < level) {
        // Not logged in / don't have access to this area.
        res.status(403).send("Permission denied for this operation.");
        console.log("Not logged in");
        return false;
    } else {
        console.log("Logged in");
        return true;
    }
}

/**
 * Sets the user account to a particular state.
 * @param req The request to operate on.
 * @param status The status of the account to set.
 */
function setLogin(req: { session: SessionData }, status:AccountType): void {
    console.log("Setting user to account type " + status);
    req.session.role = status;
}

export const createAccount = async function (req: express.Request, res: express.Response) {
    // Check for errors (based off https://heynode.com/tutorial/how-validate-and-sanitize-expressjs-form/).
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
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
    });
};

export const findAccount = function (req: express.Request, res: express.Response) {
    console.log(`Logged in: ${isLoggedIn(req)}`);
    // const accountEmail = req.body.email;
    // console.log(`Email: ${accountEmail}`);
    // Account.find({ 'email': accountEmail }).exec()
    //     .catch(reason => res.json(`Failed for reason '${reason}'`))
    //     .then(result => res.json(result));
    res.send(`Logged in: ${isLoggedIn(req)}`);
};

export const login = function (req: express.Request, res: express.Response) {
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
    // console.log(`Email: ${accountEmail}`);
    // console.log(`Password: ${givenPassword}`);
    Account.findOne({ 'email': accountEmail }).exec()
        .then(function (result) {
            if (result) {
                bcrypt.compare(givenPassword, result.password, async function (err, same) {
                    if (same) {
                        setLogin(req, AccountType.User);
                        // (req.session as any).user = {
                        //     id: req.body.email,
                        //     username: req.body.email
                        //     // Store any other user data you need
                        //   };

                        res.json("Success"); // TODO: Do something with this success
                    } else {
                        failResponse();
                    }
                });
            } else {
                failResponse();
            }
        }).catch(reason => res.json(`Failed for reason '${reason}'`))
};