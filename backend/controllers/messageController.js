const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);

    req.io.emit("newMessage", message);

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};