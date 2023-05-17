import express from "express";

import { Temperature } from "../models/temperature";
import { PipelineStage } from "mongoose";

/**
 * Handles requests to get a list of all regions.
 */
export const getRegions = function (req: express.Request, res: express.Response) {
    Temperature.distinct("Region").exec()
        .catch(reason => res.status(500).json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};

/**
 * Handles requests to get the temperatures for all regions.
 */
export const getTemperatures = function (req: express.Request, res: express.Response) {
    // Aggregate options to group by region and sort by year.
    const aggOptions: PipelineStage[] = [
        {
            $sort: {
                "Year": 1
            }
        },
        {
            $group: { // Structure to return (don't have to post process this).
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
        .catch(reason => res.status(500).json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};