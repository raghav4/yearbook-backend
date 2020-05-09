const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  isReset: { type: Boolean, default: false },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  },
});

const OTPModel = mongoose.model('OTPModel', otpSchema);
exports.OTPModel = OTPModel;
