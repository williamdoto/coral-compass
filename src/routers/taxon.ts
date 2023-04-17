import express from "express";

import { Taxon } from "../models/taxon";

export const countScientificNames = function (req: express.Request, res: express.Response) {
    Taxon.aggregate().sortByCount("scientificName").limit(10).exec()
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};