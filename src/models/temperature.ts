import mongoose from "mongoose";

let temperatureSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  Region: {
    type: String,
    required: true,
  },  
  Year: {
    type: Number,
    required: true,
  },
  "Temperature Change": {
    type: Number,
    required: true,
  }
});

export const Temperature = mongoose.model("Temperature", temperatureSchema, "Temperature");