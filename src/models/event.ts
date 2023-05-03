import mongoose from "mongoose";

let eventSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  day: {
    type: Number,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },

});

export const Event = mongoose.model("Event", eventSchema, "Event");