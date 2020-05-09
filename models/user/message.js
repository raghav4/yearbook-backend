const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sendTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
  },
});

exports.Message = mongoose.model('Message', messageSchema);
