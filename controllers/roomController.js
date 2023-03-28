import ChatRoom from "../models/ChatRoom.js";

// ChatRoom=>(topic,messages(arr[id],users[arr[id]))

//@desc Get chatrooms
//@route GET /api/chatrooms

const getChatRooms = async (req, res) => {
  const chatRooms = await ChatRoom.find();
  res.status(200).json(chatRooms);
};

//@desc Get rooms by topic
//@route GET /api/chatrooms/:topic
const getChatRoomsByTopic = async (req, res) => {
  const chatRooms = await ChatRoom.findById(req.params.topic);
  res.status(200).json(chatRooms);
};

const AddChatRoom = async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please Fill All Fields");
  }
  const room = await ChatRoom.create({
    topic: req.body.topic,
    messages: req.body.messages,
    users: req.body.users,
  });

  res.status(200).json(customer);
};

export { getChatRooms, getChatRoomsByTopic, AddChatRoom };
