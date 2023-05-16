import express from "express";

import { Temperature } from "../models/temperature";
import { AggregateOptions, PipelineStage } from "mongoose";


export const getRegions = function (req: express.Request, res: express.Response) {
    Temperature.distinct("Region").exec()
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};

export const getTemperatures = function (req: express.Request, res: express.Response) {
    const aggOptions: PipelineStage[] = [
        {
            $sort: {
                "Year": 1
            }
        },
        {
            $group: {
                "_id": "$Region",
                temperatures: {
                    $push: {
                        "x": "$Year",
                        "y": "$Temperature Change"
                    }
                }
            }
        }
    ];
    Temperature.aggregate(aggOptions)
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};