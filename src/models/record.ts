import mongoose from "mongoose";

let recordSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  associatedOccurrences: {
    type: String,
    required: true,
  },  
  basisOfRecord: {
    type: String,
    required: true,
  },
  recordedBy: {
    type: String,
    required: true,
  }
});

export const Record = mongoose.model("Record", recordSchema, "Record");