import express from "express";
import { AccountType, loginGuard } from "./account";

import { Location } from "../models/location";

/**
 * Handles requests to insert locations.
 */
export const insertLocation = function (req: express.Request, res: express.Response) {
    if (loginGuard(req, res, AccountType.User)) {
        let data = req.body
        let location = new Location({ _id: data["_id"], country: data["country"], decimalLatitude: data["decimalLatitude"], decimalLongitude: data["decimalLongitude"], geodeticDatum: data["geodeticDatum"], stateProvince: data["stateProvince"] })
        location.save().catch(reason => res.json(`Failed for reason '${reason}'`)).then(result => res.json(result));
    }
}