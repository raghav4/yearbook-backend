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
    index: { expires: '1m' },
  },
});

const OTPModel = mongoose.model('OTPModel', otpSchema);
exports.OTPModel = OTPModel;
