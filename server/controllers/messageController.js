const Message = require("../models/Messages.js");

// text,userId,chatRoomId)
//@desc Get chatrooms
//@route GET /:chatRoomId/messages

const getChatRoomMessages = async (req, res) => {
  const messages = await Message.find();
  res.status(200).json(messages);
};

const AddMessage = async (req, res) => {
  const messages = await Message.create({
    content: req.body.content,
  });
  res.status(200).json(messages);
};

module.exports = {
  getChatRoomMessages,
  AddMessage,
};
