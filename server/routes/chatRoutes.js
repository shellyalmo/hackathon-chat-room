const express = require("express");

const router = express.Router();
const {
  getChatRooms,
  getChatRoomsByTopic,
  AddChatRoom,
} = require("../controllers/roomController.js");
const {
  getUsers,
  getUsersById,
  setUser,
} = require("../controllers/userController.js");

router.route("/chatrooms").get(getChatRooms).post(AddChatRoom);
router.route("/chatrooms/:topic").get(getChatRoomsByTopic);
router.route("/chatrooms/user/").post(setUser).get(getUsers);
router.route("/chatrooms/user/:id").get(getUsersById);

module.exports = router;
