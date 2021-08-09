const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: "chatroom is required",
      ref: "chatroom",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: "chatroom is required",

      ref: "user",
    },
    message: {
      type: String,
      required: "Message is required",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
