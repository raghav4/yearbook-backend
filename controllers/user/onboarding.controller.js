/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-newline */
require('dotenv').config();
const _ = require('lodash');
const config = require('config');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const otpGenerator = require('otp-generator');
const { User } = require('../../models');
const { UserAccess, OTP } = require('../../models');

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
  const userExits = await User.findOne({ 'credentials.email': req.body.email });
  if (userExits) return res.status(400).send('Email already registered');

  const user = await UserAccess.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send(
      `Looks like you're not registered with us.
      Ask your CR to get you on board or email us at yearbook@gmail.com`,
    );
  }

  let otp = await OTP.findOne({ email: req.body.email });

  if (!otp) {
    otp = new OTP({
      otp: generatedOTP(),
      email: req.body.email,
    });

    await otp.save();
  }

  const Name = user.name || 'User';

  await sgMail.send({
    from: 'Yearbook<no-reply@yearbook.me',
    to: `${req.body.email}`,
    subject: 'Yearbook Email Verification - One Time Password',
    html: `Dear ${Name}, <br> Thank you for signing up for <b>Yearbook</b>. <br>
    Please use <b>${otp.otp}</b> to complete the Yearbook Email Verification.
    <br> Regards, <br> Yearbook Team`,
  });

  return res.status(200).send('Verify your Email now!');
};

exports.verifySignUpOTP = async (req, res) => {
  const userEmail = await OTP.findOne({ email: req.body.email });
  if (!userEmail) return res.status(400).send('Session Expired, Try again!');

  if (req.body.otp !== userEmail.otp) {
    return res.status(401).send('Invalid OTP Entered');
  }
  const userAcess = await UserAccess.findOne({ email: req.body.email });
  if (!userAcess) {
    return res.status(400).send('User does not have registeration rights');
  }
  userAcess.isVerified = true;
  await userAcess.save();

  return res.status(200).send('Successfully verified OTP');
};

exports.registerUser = async (req, res) => {
  const checkRegistered = await User.findOne({
    'credentials.email': req.body.email,
  });
  if (checkRegistered) return res.status(400).send('User already registered');

  const userAcess = await UserAccess.findOne({ email: req.body.email });
  if (!userAcess) {
    return res.status(400).send('User does not have registeration rights');
  }

  if (!userAcess.isVerified) {
    return res.status(400).send('Session Timed out, try again!');
  }
  const { name, email, password, department, section } = req.body;
  let user = new User({
    credentials: {
      name,
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

  await OTP.findOneAndRemove({ email });

  user.info = _.omit(user.info, 'bio');
  user.credentials = _.omit(user.credentials, 'password');

  user = _.pick(user, ['credentials', 'info', 'deptSection', '_id']);

  return res.status(200).send(user);
};

// eslint-disable-next-line consistent-return
exports.forgetPassword = async (req, res) => {
  const user = await User.findOne({ 'credentials.email': req.body.email });
  if (!user) {
    return res.status(400).send('We cannot find an account with that email address');
  }
  // TODO: Verify Email
  // OR SEND A TEMPORARY PASSWORD TO THE USER's email?

  const temporaryPassword = ' ok';

  const salt = await bcrypt.genSalt(15);
  user.credentials.password = await bcrypt.hash(temporaryPassword, salt);

  // return res.status()
};
