const mongoose = require("mongoose");
const { Schema } = mongoose;

//generate schema structure for USER
const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  // role: {
  //   type: String,
  //   enum: ["admin", "user"],
  //   default: "user",
  // },
});

module.exports = mongoose.model("User", UserSchema);
