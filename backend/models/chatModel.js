const mongoose = require("mongoose");
const chatModel = mongoose.Schema(
  {
    chaName: { type: string, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;