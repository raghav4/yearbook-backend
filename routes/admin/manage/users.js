const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const otpGenerator = require('otp-generator');
const sgMail = require('@sendgrid/mail');
const { User } = require('../../../models/user/userDetails');
const { AllowedUsers } = require('../../../models/user/grantAccess');
const { OTPModel } = require('../../../models/admin/otpVerification');
const { validateSignUp, validateOTP } = require('../../../utils');

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API);

const generatedOTP = () => {
  return otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
};

router.post('/', async (req, res) => {
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await AllowedUsers.findOne({ phoneNumber: req.body.phoneNumber });
  if (!user) return res.status(400).send('Number not registered');

  user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email ID is already registered');

  let otp = await OTPModel.findOne({ userEmail: req.body.email });
  if (!otp) {
    otp = new OTPModel({
      otp: generatedOTP(),
      userEmail: req.body.email,
    });
    await otp.save();
  }

  const data = {
    from: 'Yearbook<no-reply@yearbook.me',
    to: `${req.body.email}`,
    subject: 'Yearbook Email Verification - One Time Password',
    html: `Dear User, <br> Thank you for signing up for <b>Yearbook</b>. Please use <b>${otp.otp}</b> to complete the Yearbook Verification. <br> Thank you!`,
  };
  // await sgMail.send(data);
  return res.status(200).send('Verify your Email now!');
});

router.post('/verify', async (req, res) => {
  const { error } = validateOTP(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await OTPModel.findOne({ userEmail: req.body.email });

  if (!_.isEqual(req.body.otp, user.otp)) {
    return res.status(401).send('Invalid OTP Entered');
  }
  // TODO #9: Check the credentials, the user can modify the phoneNumber later after verification
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    isAdmin: req.body.isAdmin,
    department: req.body.department,
    section: req.body.section,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  await OTPModel.findOneAndRemove({ userEmail: req.body.email });

  return res.status(200).send('Successfully added User!');
});

module.exports = router;
