const mongoose = require("mongoose");
const { Schema } = mongoose;

const MsgSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },

    chatId: mongoose.Schema.Types.ObjectId,

    senderId: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("msg", MsgSchema);
