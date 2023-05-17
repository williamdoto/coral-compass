import express from "express";
import session from "express-session";
import * as bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import config from "../../server/config.json";
import { Account } from "../models/account";

// Validate login details. Based off of
// https://heynode.com/tutorial/how-validate-and-sanitize-expressjs-form/
const emailValidate = check('email', 'Email address must be in the format \'abc@deg.geg\'').isEmail().trim().escape().normalizeEmail();
const passwordValidate = check('password').isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .matches('[0-9]').withMessage('Password Must Contain a Number')
    .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter');
const usernameValidate = check('username', 'Username must be provided');

export const loginValidate = [emailValidate, passwordValidate];
export const accountCreateValidate = [emailValidate, passwordValidate, usernameValidate];

/**
 * An enumerator that specifies access levels.
 * A higher access level has permissions to access everything of the levels
 * below it.
 */
export enum AccountType {
    NotLoggedIn = 0,
    User = 1
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
export function loginGuard(req: { session: SessionData }, res: express.Response, level: AccountType): boolean {
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
function setLogin(req: { session: SessionData }, status: AccountType): void {
    console.log("Setting user to account type " + status);
    req.session.role = status;
}

/**
 * Handles requests to create an account.
 */
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
            // Check if the account already exists.
            // TODO: Transaction management.
            const docs = await Account.find({ 'email': theAccount.email });
            console.log(docs);
            if (docs.length === 0) {
                // Couldn't find an existing account with that email.
                try {
                    // Attempt to save the new account.
                    await theAccount.save();
                    console.log('User saved successfully');
                    res.send('User saved successfully.');
                } catch (error) {
                    // Couldn't save it.
                    console.error('Error saving user:', error);
                    res.status(500).send('Error saving user. Please try again.');
                }
            } else {
                // Account already exists.
                console.log("Duplicate user found");
                res.status(422).send("A user with this email address already has an account. Please log in with that account or use a different email address.");
            }
        } catch (error) {
            // Something went wrong.
            console.error('Error fetching account:', error);
            res.status(500).send('Error fetching account. Please try again.');
        }
    });
};

/**
 * Handles requests to check whether the user is currently logged in.
 * Mainly useful for debugging purposes.
 */
export const findAccount = function (req: express.Request, res: express.Response) {
    res.send(`Logged in: ${isLoggedIn(req)}`);
};

/**
 * Handles requests for the user to log in.
 */
export const login = function (req: express.Request, res: express.Response) {
    /**
     * Function that sends a failure response. This is used to keep unkown
     * email and bad password responses ambiguous for security reasons.
     */
    function failResponse() {
        console.log(`Incorrect email or password`);
        res.json(`Incorrect email or password`);
    }

    // Extract the given email and passwords and attempt to find them in the database.
    const accountEmail = req.body.email;
    const givenPassword = req.body.password;
    Account.findOne({ 'email': accountEmail }).exec()
        .then(function (result) {
            if (result) {
                // Found a user with the same email in the database. Check that
                // the password given could have been used to generate the hash
                // in the database.
                bcrypt.compare(givenPassword, result.password, async function (err, same) {
                    if (same) {
                        // Logged in successfully.
                        setLogin(req, AccountType.User);
                        res.json("Success");
                    } else {
                        // Incorrect password.
                        failResponse();
                    }
                });
            } else {
                // No user found with the same email.
                failResponse();
            }
        }).catch(reason => res.status(500).json(`Failed for reason '${reason}'`))
};