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

  cheetCode: String,

  ping: [
    {
      code: String,
      connectionName: String,
    },
  ],

  connectedUser: [
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
