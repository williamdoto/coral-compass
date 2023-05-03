import express from "express";
import config from "../../server/config.json";

import { Institution } from "../models/institution";

export const insertInstitution = function (req: express.Request, res: express.Response) {
    let data = req.body
    let institution = new Institution({_id: data["_id"], institutionCode: data["institutionCode"]})
    institution.save().catch(reason => res.json(`Failed for reason '${reason}'`)).then(result => res.json(result));
}