import express from "express";

import { Temperature } from "../models/temperature";
import { AggregateOptions, PipelineStage } from "mongoose";


export const getRegions = function (req: express.Request, res: express.Response) {
    Temperature.distinct("Region").exec()
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};

export const getTemperatures = function (req: express.Request, res: express.Response) {
    const aggOptions:PipelineStage.Group[] = [{
        $group: {
            "_id": "$Region",
            temperatures: {
                $push: "$Temperature Change"
            },
            years: {
                "$push": "$Year"
            }
        }
    }];
    Temperature.aggregate(aggOptions)
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};