import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import { Server } from "socket.io";

import errorHandler from "./middleware/errorHandler.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.static("client/dist"));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

import chatRoutes from "./routes/chatRoutes.js";

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

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  // console.log(socket.rooms);
  socket.on("newUser", (data, fn) => {});
  socket.on("join", function (data) {
    socket.join(data.room);
  });
  socket.on("room1", function (data) {
    socket.join(data.room);
    io.to("room1").emit("chat message", data.msg);
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
