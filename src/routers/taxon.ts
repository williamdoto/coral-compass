import express from "express";
import { GenusNameCount, Taxon } from "../models/taxon";

import { check, validationResult } from "express-validator";

export const countGenusValidate = [
    check('limit', 'The limit must be an integer > 0').isInt({min: 1}).toInt()
];

export const countGenus = function (req: express.Request, res: express.Response) {
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
    const limit:number = limitTest;

    /**
     * Returns a function that will process an array of `GenusNameCount` and
     * convert the bottom portion into "other".
     * @param limit The maximum number of genuses to include before aggregating to "other".
     */
    function reduceToOther(limit: number): (data: GenusNameCount[]) => GenusNameCount[] {
        return function (data) {
            const namedPart = data.slice(0, limit);
            // Calculate and add "other".
            let combined = namedPart.concat([{
                _id: "Other",
                count: data.slice(limit).reduce(
                    (prev:number, cur:GenusNameCount) => prev + cur.count,
                    0
                ), // Sum the count components
                genusesContained: data.length - limit
            }]);
            // Sort in descending order (other will likely have moved up a few places)
            return combined.sort((a, b) => b.count - a.count);
        }
    }

    // Count all elements where the genus is not null and serve the result.
    Taxon.aggregate().match({
        genus: { $ne: null }
    })
        .sortByCount("genus").exec()
        .then(data => res.json(reduceToOther(limit)(data)))
        .catch(reason => res.json(`Failed for reason '${reason}'`));
};