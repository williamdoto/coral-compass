const mongoose = require("mongoose");

let accountSchema = mongoose.Schema({
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
module.exports = mongoose.model("Account", accountSchema);