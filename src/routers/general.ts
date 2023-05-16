import express from "express";

import { General } from "../models/general";
import { Institution } from "../models/institution";
import { Record } from "../models/record";
import { Occurence } from "../models/occurence";
import { Catalog } from "../models/catalog";
import { Location } from "../models/location";
import { Taxon } from "../models/taxon";

import { AccountType, loginGuard } from "./account";



export const findLocation = function (req: express.Request, res: express.Response) {
    General.find().exec()
        .catch(reason => res.json(`Failed for reason '${reason}'`))
        .then(result => res.json(result));
};

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
        
        general.save().catch(reason => res.json(`Failed for reason '${reason}'`)).then(result => res.json(result));
    }
};