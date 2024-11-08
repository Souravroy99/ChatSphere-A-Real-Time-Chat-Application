const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message: {
      text: {
        type: String,
        required: true  ,
      },
    }, 
    users: {
      type: Array,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;