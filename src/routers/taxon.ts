import express from "express";

import { Taxon, ScientificNameCount } from "../models/taxon";

export const countScientificNames = function (req: express.Request, res: express.Response) {
    /**
     * Groups by the first word of the scientific name (could probably be done
     * as part of the request)
     * // NOTE: This is actually just extracting the genus, so not needed.
     */
    function aggregateSimilar(data:ScientificNameCount[]): ScientificNameCount[] {
        let aggregated:{[_id: string]:ScientificNameCount} = {};
        // For each data point, add it to a dictionary where the key is the first part of the name.
        for (let i in data) {
            let shortname = data[i]._id.split(' ', 1)[0];
            if (aggregated[shortname]) {
                // Already come across this species before.
                aggregated[shortname].count += data[i].count;
            } else {
                aggregated[shortname] = {
                    _id: shortname,
                    count: data[i].count
                };
            }
        }
        // Return the disctionary as a list.
        return Object.values(aggregated);
    }

    Taxon.aggregate().sortByCount("scientificName").exec()
        .then(data => res.json(aggregateSimilar(data)))
        .catch(reason => res.json(`Failed for reason '${reason}'`));
        // .then(result => res.json(result));
};