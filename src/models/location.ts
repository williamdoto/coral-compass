import mongoose from "mongoose";

let locationSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  country: {
    type: String,
  },  
  decimalLatitude: {
    type: Number,
    required: true,
  },
  decimalLongitude: {
    type: Number,
    required: true,
  }, 
  geodeticDatum: {
    type: String,
    required: true,
  },  
  stateProvince: {
    type: String,
  },  
});

export const Location = mongoose.model("Location", locationSchema, "Location");