import express from "express";

import { General } from "../models/general";


export const findLocation = function (req: express.Request, res: express.Response) {
    General.find().exec()
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};