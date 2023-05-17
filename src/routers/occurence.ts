import express from "express";
import { AccountType, loginGuard } from "./account";

import { Occurence } from "../models/occurence";

/**
 * Handles requests to insert occurences.
 */
export const insertOccurence = function (req: express.Request, res: express.Response) {
    if (loginGuard(req, res, AccountType.User)) {
        let data = req.body
        let occurence = new Occurence({ _id: data["_id"], occurrenceID: data["occurrenceID"], occurrenceStatus: data["occurrenceStatus"], preparations: data["preparations"] })
        occurence.save().catch(reason => res.json(`Failed for reason '${reason}'`)).then(result => res.json(result));
    }
}