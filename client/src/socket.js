import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL ='https://hackathon-chat-room.onrender.com';

export const socket = io(URL);
