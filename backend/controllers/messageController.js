const Message = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body; // The sequence doesn't matter
    const data = await Message.create({
      // The sequence doesn't matter
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    console.log(data)

    if (data) {
        return res.status(200).json({ msg: "Message added successfully." });
    }
    return res.status(200).json({ msg: "Failed to add." });
  } 
  catch (error) {
    next(error);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const {from, to} = req.body();  // The sequence doesn't matter

    const allMsg = await Message.find({ users: { $all: [from, to] } }).sort({updatedAt: 1});

    const projectMessages = allMsg.map((msg) => {   // What is that study it!
        return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
        }
    })

    return res.status(200).json({ projectMessages });
  } catch (error) {
    next(error);
  }
};
