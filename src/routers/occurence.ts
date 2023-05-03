import express from "express";
import config from "../../server/config.json";

import { Occurence } from "../models/occurence";

export const insertOccurence = function (req: express.Request, res: express.Response) {
    let data = req.body
    let occurence = new Occurence({_id: data["_id"], occurrenceID: data["occurrenceID"], occurrenceStatus: data["occurrenceStatus"], preparations: data["preparations"]})
    occurence.save().catch(reason => res.json(`Failed for reason '${reason}'`)).then(result => res.json(result));
}