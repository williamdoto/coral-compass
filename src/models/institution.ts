import mongoose from "mongoose";

let institutionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  institutionCode: {
    type: String,
    required: true,
  }
});

export const Institution = mongoose.model("Institution", institutionSchema, "Institution");