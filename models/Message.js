import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
  text: {
    type: String,
    required: [true, 'text is required.'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: [true, 'User is required.'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom',
    // required: [true, 'Chat Room is required.'],
  }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
