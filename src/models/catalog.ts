import mongoose from "mongoose";

let catalogSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  catalogNumber: {
    type: String,
    required: true,
  },  
  otherCatalogNumbers: {
    type: Number,
    required: true,
  },
  collectionCode: {
    type: String,
    required: true,
  }
});

export const Catalog = mongoose.model("Catalog", catalogSchema, "Catalog");