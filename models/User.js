const mongoose = require("mongoose");
var moment = require("moment");
var now = moment();

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [5, "Minimum length of username should be 5 characters"],
    maxlength: [15, "username length can't be grater than 15"],
    required: [false, "username is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },

  createAt: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
