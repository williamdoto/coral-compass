import mongoose from "mongoose";

let occurrenceSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  occurrenceID: {
    type: String,
    required: true,
  },  
  occurrenceStatus: {
    type: String,
    required: true,
  },
  preparations: {
    type: String,
    required: true,
  }
});

export const Occurence = mongoose.model("Occurence", occurrenceSchema, "Occurence");