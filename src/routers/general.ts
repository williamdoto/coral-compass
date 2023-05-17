import express from "express";

import { General } from "../models/general";

import { AccountType, loginGuard } from "./account";

/**
 * Handles requests for all data in the general collection.
 */
export const findLocation = function (req: express.Request, res: express.Response) {
    General.find().exec()
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};

/**
 * Handles requests to import data into the general collection.
 */
export const importData = function (req: express.Request, res: express.Response) {
    if (loginGuard(req, res, AccountType.User)) {
        let data = req.body
        const general = new General({
            _id: data._id,
            "dcterms:modified": data["dcterms:modified"],
            institutionCode: data.institutionCode,
            collectionCode: data.collectionCode,
            basisOfRecord: data.basisOfRecord,
            occurrenceID: data.occurrenceID,
            catalogNumber: data.catalogNumber,
            occurrenceStatus: data.occurrenceStatus,
            preparations: data.preparations,
            otherCatalogNumbers: data.otherCatalogNumbers,
            associatedOccurrences: data.associatedOccurrences,
            country: data.country,
            stateProvince: data.stateProvince,
            decimalLatitude: data.decimalLatitude,
            decimalLongitude: data.decimalLongitude,
            geodeticDatum: data.geodeticDatum,
            taxonID: data.taxonID,
            taxonConceptID: data.taxonConceptID,
            scientificName: data.scientificName,
            kingdom: data.kingdom,
            phylum: data.phylum,
            class: data.class,
            order: data.order,
            family: data.family,
            genus: data.genus,
            specificEpithet: data.specificEpithet,
            taxonRank: data.taxonRank,
            scientificNameAuthorship: data.scientificNameAuthorship,
        });

        general.save()
            .catch(reason => res.status(500).json(`Failed for reason '${reason}'`))
            .then(result => res.json(result));
    }
};