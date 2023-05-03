import express from "express";
import { GenusSpeciesNameCount, Taxon } from "../models/taxon";

import { check, validationResult } from "express-validator";
import { PipelineStage } from "mongoose";

export const findSpecies = function (req: express.Request, res: express.Response) {
    Taxon.find({ 'scientificName': req.params["name"] }).exec()
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};

export const countPositive = [
    check('limit', 'The limit must be an integer > 0').isInt({ min: 1 }).toInt()
];

export const validateSpeciesRequest = [
    check('limit', 'The limit must be an integer > 0').isInt({ min: 1 }).toInt(),
    check('genus', 'The genus must be a string').isString()
];

export function countSpecies(req: express.Request, res: express.Response) {
    // Obtain and sanitise the parameters.
    // Check for errors (based off https://heynode.com/tutorial/how-validate-and-sanitize-expressjs-form/).
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    const limit: number = getLimit(req);
    const genus: string = getGenus(req);

    // Count all elements where the genus is not null and serve the result.
    Taxon.aggregate().match({
        genus: { $eq: genus } // TODO: Make case insensitive
    })
        .sortByCount("scientificName").exec()
        .then(data => res.json(reduceToOther(limit)(data)))
        .catch(reason => res.json(`Failed for reason '${reason}'`));
}

export function countGenus(req: express.Request, res: express.Response) {
    // Obtain and sanitise the parameters.
    // Check for errors (based off https://heynode.com/tutorial/how-validate-and-sanitize-expressjs-form/).
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    const limit: number = getLimit(req);

    // Count all elements where the genus is not null and serve the result.
    Taxon.aggregate().match({
        genus: { $ne: null }
    })
        .sortByCount("genus").exec()
        .then(data => res.json(reduceToOther(limit)(data)))
        .catch(reason => res.json(`Failed for reason '${reason}'`));
}

function getLimit(req: express.Request):number {
    const limitTest = req.query["limit"];
    if (typeof limitTest !== "number") {
        throw new Error("Validation failed, was expecting a number for limit");
    }
    return limitTest;
}

function getGenus(req: express.Request):string {
    const genusTest = req.query["genus"];
    if (typeof genusTest !== "string") {
        throw new Error("Validation failed, was expecting a string for genus");
    }
    return genusTest;
}

/**
 * Returns a function that will process an array of `GenusNameCount` and
 * convert the bottom portion into "other".
 * @param limit The maximum number of genuses to include before aggregating to "other".
 */
function reduceToOther(limit: number): (data: GenusSpeciesNameCount[]) => GenusSpeciesNameCount[] {
    return function (data) {
        const namedPart = data.slice(0, limit);
        // Calculate and add "other".
        let combined = namedPart.concat([{
            _id: "Other",
            count: data.slice(limit).reduce(
                (prev: number, cur: GenusSpeciesNameCount) => prev + cur.count,
                0
            ), // Sum the count components
            otherContains: data.length - limit
        }]);
        // Sort in descending order (other will likely have moved up a few places)
        return combined.sort((a, b) => b.count - a.count);
    }
}