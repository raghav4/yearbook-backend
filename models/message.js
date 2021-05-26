const mongoose = require('mongoose');

const Message = mongoose.model(
  'Message',
  new mongoose.Schema({
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }),
);

module.exports = Message;
