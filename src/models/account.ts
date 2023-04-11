import mongoose from "mongoose";

let accountSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  username: {
    type: String,
    required: true,
  },  
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

export const Account = mongoose.model("Account", accountSchema, "Account");