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
  isVerified: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  },
});

// TODO: Cron Job to delete the expiresAt automatically?

module.exports = mongoose.model('OTP', otpSchema);
