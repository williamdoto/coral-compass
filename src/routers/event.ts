import express from "express";
import { loginGuard, AccountType } from "./account";

import { Event } from "../models/event";

/**
 * Handles requests to insert events.
 */
export const insertEvent = function (req: express.Request, res: express.Response) {
    if (loginGuard(req, res, AccountType.User)) {
        // TODO:
        res.status(500).send("Not implemented yet");
    }
}