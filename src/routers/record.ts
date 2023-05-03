import express from "express";
import config from "../../server/config.json";

import { Record } from "../models/record";

export const insertRecord = function (req: express.Request, res: express.Response) {
    let data = req.body
    let record = new Record({_id: data["_id"], associatedOccurrences: data["associatedOccurrences"], basisOfRecord: data["basisOfRecord"], recordedBy: data["recordedBy"]})
    record.save().catch(reason => res.json(`Failed for reason '${reason}'`)).then(result => res.json(result));
}