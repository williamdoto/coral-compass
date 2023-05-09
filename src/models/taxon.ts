import mongoose from "mongoose";

let taxonSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  family: {
    type: String,
    required: true,
  },  
  genus: {
    type: String,
    required: true,
  },
  kingdom: {
    type: String,
    required: true,
  },
  order: {
    type: String,
    required: true,
  },
  phylum: {
    type: String,
    required: true,
  },
  specificEpithet: {
    type: String,
    required: true,
  },
  taxonConceptID: {
    type: String,
    required: true,
  },
  taxonID: {
    type: Number,
    required: true,
  },
  taxonRank: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
    required: true,
  },
  scientificNameAuthorship: {
    type: String,
    required: true,
  },
});

export type TaxonCount = {
  _id: string;
  count: number;
};

export type TaxonCountMany = {
  taxons: TaxonCount[];
  otherCount: number;
  otherTaxonCount: number;
}

export type GenusColourPair = {
  genus: string;
  colour: string;
};

export const Taxon = mongoose.model("Taxon", taxonSchema, "Taxon");