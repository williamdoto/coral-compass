import express from "express";
import { GenusSpeciesNameCount, Taxon } from "../models/taxon";

import { check, validationResult } from "express-validator";

export const findSpecies = function (req: express.Request, res: express.Response) {
    Taxon.find({ 'scientificName': req.params["name"] }).exec()
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};

export const countPositive = [
    check('limit', 'The limit must be an integer > 0').isInt({ min: 1 }).toInt()
];

export const countGenus = countProperty("genus");
export const countSpecies = countProperty("scientificName");

/**
 * 
 * @param property the property to group by.
 * @returns Function that handles a request for this aggregation.
 */
function countProperty(property: string) {
    return function (req: express.Request, res: express.Response) {
        // Obtain and sanitise the parameters.
        // Check for errors (based off https://heynode.com/tutorial/how-validate-and-sanitize-expressjs-form/).
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const limitTest = req.query["limit"];
        if (typeof limitTest !== "number") {
            throw new Error("Validation failed, was expecting a number");
        }
        const limit: number = limitTest;

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

        // Count all elements where the genus is not null and serve the result.
        Taxon.aggregate().match({
            genus: { $ne: null }
        })
            .sortByCount(property).exec()
            .then(data => res.json(reduceToOther(limit)(data)))
            .catch(reason => res.json(`Failed for reason '${reason}'`));
    }
};