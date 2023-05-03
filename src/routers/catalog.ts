import express from "express";
import config from "../../server/config.json";

import { Catalog } from "../models/catalog";

export const insertCatalog = function (req: express.Request, res: express.Response) {
    let data = req.body
    let catalog = new Catalog({_id: data["_id"], catalogNumber: data["catalogNumber"], otherCatalogNumbers: data["otherCatalogNumbers"], collectionCode: data["collectionCode"] })
    catalog.save().catch(reason => res.json(`Failed for reason '${reason}'`)).then(result => res.json(result));
}