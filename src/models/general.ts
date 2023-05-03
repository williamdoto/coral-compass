import mongoose from "mongoose";

let generalSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  "dcterms:modified": {
    type: String,
  },
  institutionCode: {
    type: String,
  },
  collectionCode: {
    type: String,
  },
  basisOfRecord: {
    type: String,
  },
  occurrenceID: {
    type: String,
  },
  catalogNumber: {
    type: String,
  },
  occurrenceStatus: {
    type: String,
  },
  preparations: {
    type: String,
  },
  otherCatalogNumbers: {
    type: String,
  },
  associatedOccurrences: {
    type: String,
  },
  country: {
    type: String,
  },
  stateProvince: {
    type: String,
  },
  decimalLatitude: {
    type: String,
  },
  decimalLongitude: {
    type: String,
  },
  geodeticDatum: {
    type: String,
  },
  taxonID: {
    type: String,
  },
  taxonConceptID: {
    type: String,
  },
  scientificName: {
    type: String,
  },
  kingdom: {
    type: String,
  },
  phylum: {
    type: String,
  },
  class: {
    type: String,
  },
  order: {
    type: String,
  },
  family: {
    type: String,
  },
  genus: {
    type: String,
  },
  specificEpithet: {
    type: String,
  },
  taxonRank: {
    type: String,
  },
  scientificNameAuthorship: {
    type: String,
  },
});

export const General = mongoose.model("General", generalSchema, "General");