import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import { Server } from "socket.io";
import errorHandler from "./middleware/errorHandler.js";
import cors from 'cors'
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
// Body parser middleware
app.use(express.json());
app.use(express.static("client/dist"));
app.use(cors())
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

import chatRoutes from "./routes/chatRoutes.js";
import Message from "./models/Message.js";

app.use("/api/chats", chatRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

const io = new Server(server, {
  cors: {
    origins: "*:*",
  },
});

io.listen(5001);



async function addChatMessageToDB(data) {
  // your code for adding the message to the database
  const messages = await Message.create({
    text:data.msg,
    user: "64233b4ab9bb7f5b8f3f6ec8",
    chatRoom:"64233c2ab9bb7f5b8f3f6ecb"
    
  });
    return messages
  res.status(200).json(messages);

}

async function getAllChatMessagesFromDB() {
  // your code for getting all chat messages from the database
  const messages = await Message.find();
  return messages
  res.status(200).json(messages);
}



io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  // console.log(socket.rooms);
  socket.on("newUser", (data, fn) => {});
  socket.on("join", function (data) {
    socket.join(data.room);
  });
  socket.on("room1", async function (data) {
    // console.log(data);
    socket.join(data.room);
    await addChatMessageToDB(data);
    io.to("room1").emit("chat message", data.msg);
  });
  
  // custom event listener for getting all old messages
  socket.on("get old messages", async function (data) {
    try {
      // get all old messages from database
      const chatMessages = await getAllChatMessagesFromDB();
      console.log(chatMessages);
      // emit old messages to the requesting socket
      socket.emit("old messages", chatMessages);
    } catch (error) {
      console.log(error);
    }
  });
  
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
