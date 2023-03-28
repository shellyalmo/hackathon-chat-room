import {Message} from "../models/Message";

// text,userId,chatRoomId)
//@desc Get chatrooms
//@route GET /:chatRoomId/messages

const getChatRoomMessages = async (req, res) => {
  const messages = await Message.find();
  res.status(200).json(messages);
};
const getChatRoomMessages2 = async () => {
  const messages = await Message.find();
  res.status(200).json(messages);
};

const AddMessage = async (req, res) => {
  const messages = await Message.create({
    content: req.body.content,
  });
  res.status(200).json(messages);
};
const AddMessage2 = async (body) => {
  const messages = await Message.create({
    content: body
  });
  res.status(200).json(messages);
};

export { getChatRoomMessages, AddMessage,AddMessage2,getChatRoomMessages2 };
