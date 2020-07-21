/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-newline */
require('dotenv').config();
const _ = require('lodash');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const otpGenerator = require('otp-generator');
const debug = require('debug')('app:onboardingController');
const { User } = require('../../models');
const { UserAccess, OTP } = require('../../models');

sgMail.setApiKey(config.get('SGAPI'));

const generatedOTP = () => {
  debug('Generated OTP!');
  return otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
};

exports.loginUser = async (req, res) => {
  debug('Function : loginUser, Purpose : Route to log in a user');
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
  debug(
    'Function : validateSignUpAccess(), Purpose : Route to validate the User SignUp Access!',
  );
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
  debug(
    'Function: verifySignUpOTP, Purpose : Route to verify the Email Verification OTP',
  );
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
  debug('Function: registerUser(), Purpose : Route to register a user');
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
exports.forgotPassword = async (req, res) => {
  debug(
    'function: forgotPassword(), Purpose: Route to reset the password of users credentials',
  );
  const user = await User.findOne({ 'credentials.email': req.body.email });
  if (!user) return res.status(400).send('Email not registered with us.');

  try {
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'), {
      expiresIn: '15m',
    });

    await sgMail.send({
      from: 'Yearbook<no-reply@yearbook.me',
      to: `${user.credentials.email}`,
      subject: 'Password Reset Link',
      html: `<html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Actionable emails e.g. reset password</title>
      <link href="styles.css" media="all" rel="stylesheet" type="text/css" />
      </head>

      <body itemscope itemtype="http://schema.org/EmailMessage">

      <table class="body-wrap">
        <tr>
          <td></td>
          <td class="container" width="600">
            <div class="content">
              <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction">
                <tr>
                  <td class="content-wrap">
                    <meta itemprop="name" content="Confirm Email"/>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="content-block">
                          Dear User, You can reset the password by clicking on the link below.
                        </td>
                      </tr>
                      <tr>
                        <td class="content-block">
                          If you did not request to reset your password, you can ignore this email. Your account is safe.
                        </td>
                      </tr>
                      <tr>
                        <td class="content-block">
                          Please do not share this link with anyone else as that would let others to reset your account, this link is valid only for <b>15 minutes</b>
                        </td>
                      </tr>
                      <tr>
                        <td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
                          <a href="http://localhost:5000/forgot_password/${token}" class="btn-primary" itemprop="url">Reset Password</a>
                        </td>
                      </tr>
                      <tr>
                      <tr>
                        <td class="content-block">
                          Copy and Paste this link in your browswer if the above button doesn't work, http://localhost:5000/forgot_password/${token}
                        </td>
                      </tr>
                        <td class="content-block">
                          &mdash; Yearbook Team
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table></div>
          </td>
          <td></td>
        </tr>
      </table>

      </body>
      </html>`,
    });

    return res.status(200).send('Email with reset password link, is on its way');
  } catch (ex) {
    debug(ex);
  }
};

exports.verifyPasswordTokenLink = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, config.get('jwtPrivateKey'));
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).send('User does not exist');
    return res.status(200).send('Valid token');
  } catch (ex) {
    debug(ex);
    return res
      .status(400)
      .send('Either the link is invalid or expired, Please try again later');
  }
};

// exports.registerNewPassword = async (req, res) => {};
