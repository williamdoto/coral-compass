/**
 * Contains the mongoose model and useful data types for processing taxonomies.
 */
import mongoose from "mongoose";

/**
 * Mongoose model for taxonomy
 */
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

/**
 * A grouping consisting of a taxon (species, genus...) and the count of the
 * number of occurrences.
 */
export type TaxonCount = {
  _id: string;
  count: number;
};

/**
 * A count of the top fraction of a particular taxon. This also includes the
 * count of the number of taxons that are not in the top fraction and the total
 * sum of those counts.
 */
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