const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { required: true, type: String },
    password: {  type: String,required: true} ,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
};
