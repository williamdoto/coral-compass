import mongoose from "mongoose";

let generalSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  "dcterms:modified": {
    type: String,
    required: true,
  },  
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution',
  },
  record: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record',
  },
  occurence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Occurence',
  },
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
  taxon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Taxon',
  },
});

export const General = mongoose.model("General", generalSchema, "General");