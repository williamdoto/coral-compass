import express from "express";
import { AccountType, loginGuard } from "./account";

import { Institution } from "../models/institution";

export const insertInstitution = function (req: express.Request, res: express.Response) {
    if (loginGuard(req, res, AccountType.User)) {
        let data = req.body
        let institution = new Institution({ _id: data["_id"], institutionCode: data["institutionCode"] })
        institution.save().catch(reason => res.json(`Failed for reason '${reason}'`)).then(result => res.json(result));
    }
}