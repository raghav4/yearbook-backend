const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  },
});

const OTPModel = mongoose.model('OTPModel', otpSchema);
exports.OTPModel = OTPModel;
