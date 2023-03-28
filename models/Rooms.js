const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
