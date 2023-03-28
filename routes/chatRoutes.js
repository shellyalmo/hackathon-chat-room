import express from "express";

const router = express.Router();
import {
  getChatRooms,
  getChatRoomsByTopic,
  AddChatRoom,
} from "../controllers/roomController.js";
import {
  getUsers,
  getUsersById,
  setUser,
} from "../controllers/userController.js";

router.route("/chatrooms").get(getChatRooms).post(AddChatRoom);
router.route("/chatrooms/:topic").get(getChatRoomsByTopic);
router.route("/chatrooms/user/").post(setUser).get(getUsers);
router.route("/chatrooms/user/:id").get(getUsersById);

export default router;
