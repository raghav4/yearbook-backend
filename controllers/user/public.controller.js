require('dotenv').config();
const config = require('config');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const otpGenerator = require('otp-generator');
const { User } = require('../../models/user');
const { AllowedUsers } = require('../../models/grantAccess');
const { OTPModel } = require('../../models/otpVerification');

sgMail.setApiKey(config.get('SGAPI'));

const generatedOTP = () => {
  return otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    'credentials.email': email,
  });
  if (!user) return res.status(400).send('Invalid Email or Password');

  const validPassword = await bcrypt.compare(password, user.credentials.password);
  if (!validPassword) return res.status(401).send('Invalid Email or Password');

  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send('Login Successful');
};

exports.validateSignUpAccess = async (req, res) => {
  const { email, phoneNo } = req.body;

  const allowedPhoneNo = await AllowedUsers.findOne({
    phoneNumber: phoneNo,
  });
  if (!allowedPhoneNo) return res.status(400).send('Number not registered');

  const user = await User.findOne({
    'credentials.email': email,
  });

  if (user) return res.status(400).send('Email ID is already registered');

  let otp = await OTPModel.findOne({
    email,
    phoneNo,
  });
  if (!otp) {
    otp = new OTPModel({
      otp: generatedOTP(),
      email,
      phoneNo,
    });
    await otp.save();
  }

  await sgMail.send({
    from: 'Yearbook<no-reply@yearbook.me',
    to: `${email}`,
    subject: 'Yearbook Email Verification - One Time Password',
    html: `Dear User, <br> Thank you for signing up for <b>Yearbook</b>.
    Please use <b>${otp.otp}</b> to complete the Yearbook Verification.
    <br> Thank you!`,
  });

  return res.status(200).send('Verify your Email now!');
};

exports.verifySignUp = async (req, res) => {
  const { name, email, phoneNo, password, department, section, otp } = req.body;

  let user = await OTPModel.find().or([{ email }, { phoneNo }]);
  if (!user.length) return res.status(404).send('Try again');

  user = await OTPModel.findOne({ email, phoneNo });

  if (!user) return res.status(400).send('Invalid Email or Phone Number');

  if (!_.isEqual(otp, user.otp)) {
    return res.status(401).send('Invalid OTP Entered');
  }

  user = new User({
    credentials: {
      name,
      phoneNo,
      email,
      password,
      // username: `${name.split(' ').join('')}`,
    },
    deptSection: {
      department,
      section,
    },
  });

  const salt = await bcrypt.genSalt(15);
  user.credentials.password = await bcrypt.hash(user.credentials.password, salt);
  await user.save();
  await OTPModel.findOneAndRemove({ email });

  user.credentials = _.omit(user.credentials, 'password');
  user = _.pick(user, ['credentials', 'info', 'deptSection', 'socialHandles', '_id']);

  return res.status(200).send(user);
};

exports.resetPassword = async (req, res) => {
  const user = await User.find().or([
    { 'credentials.email': req.body.input },
    { 'credentials.phoneNo': req.body.input },
  ]);
  if (!user) return res.send('Try again later');
  return res.send(user);
};
