import express from "express";
import { AccountType, loginGuard } from "./account";

import { Record } from "../models/record";

/**
 * Handles requests to insert records.
 */
export const insertRecord = function (req: express.Request, res: express.Response) {
    if (loginGuard(req, res, AccountType.User)) {
        let data = req.body
        let record = new Record({ _id: data["_id"], associatedOccurrences: data["associatedOccurrences"], basisOfRecord: data["basisOfRecord"], recordedBy: data["recordedBy"] })
        record.save().catch(reason => res.json(`Failed for reason '${reason}'`)).then(result => res.json(result));
    }
}