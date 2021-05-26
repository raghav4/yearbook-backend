/**
 * Description.
 * - Controller for User Routes
 *
 * 1. Login the User
 * 2. SignUp User
 * 3. Get the User
 * 4. Update the User
 * 5. Get the User Self Answers
 */

require('dotenv').config();
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const config = require('config');
const sgMail = require('@sendgrid/mail');
const otpGenerator = require('otp-generator');
const imgBBUploader = require('imgbb-uploader');
const { User } = require('../../models/user');
const { AllowedUsers } = require('../../models/grantAccess');
const { Message } = require('../../models/user');
const { OTPModel } = require('../../models/otpVerification');

sgMail.setApiKey(config.get('SGAPI'));

const generatedOTP = () => {
  return otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
};

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({
//     'credentials.email': email,
//   });
//   if (!user) return res.status(400).send('Invalid Email or Password');

//   const validPassword = await bcrypt.compare(password,
//   user.credentials.password); if (!validPassword) return
//   res.status(401).send('Invalid Email or Password');

//   const token = user.generateAuthToken();
//   return res.header('x-auth-token', token).send('Login Successful');
// };

// exports.getClassUsers = async (req, res) => {
//   const user = await User.findById(req.user._id);
//   const users = await User.find({
//     $and: [{ _id: { $ne: req.user._id } }, { deptSection: user.deptSection
//     }],
//   });
//   return res.send(users);
// };

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

// exports.getUser = async (req, res) => {
//   let user = await User.findById(req.user._id);
//   user.credentials = _.omit(user.credentials, 'password');
//   user = _.pick(user, ['credentials', 'info', 'deptSection', 'socialHandles',
//   '_id']); if (!user) return res.status(400).send('User not found');

//   return res.status(200).send(user);
// };

// exports.allUsers = async (req, res) => {
//   const users = await User.find({ _id: { $ne: req.user._id } });

//   if (!users.length) return res.status(404).send('No User is there in the
//   DB'); return res.status(200).send(users);
// };

// exports.updateUser = async (req, res) => {
//   let user = await User.findById(req.user._id);
//   if (!user) return res.status(404).send('User not found');

//   const { info, socialHandles } = req.body;

//   user = await User.findByIdAndUpdate(
//     req.user._id,
//     {
//       info: {
//         bio: info.bio,
//         profilePicture: user.info.profilePicture,
//       },
//       socialHandles,
//     },
//     {
//       new: true,
//     },
//   );
//   user.credentials = _.omit(user.credentials, 'password');
//   user = _.pick(user, ['credentials', 'info', 'deptSection', 'socialHandles',
//   '_id']); return res.status(200).send(user);
// };

exports.updateUserProfilePicture = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).send('No user found!');

  if (req.files === null) {
    return res.status(400).send('Please send a valid file');
  }
  const { file } = req.files;

  file.mv(`${__dirname}/../tmp/${file.name}`, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    try {
      const { url } = await imgBBUploader(
        config.get('IMGBBKEY')`${__dirname}/../tmp/${file.name}`,
      );
      user.info.profilePicture = url;
      await user.save();
      return res.status(200).send(url);
    } catch (ex) {
      return res.status(500).send(ex.message);
    }
  });
};

// exports.getUserMessage = async (req, res) => {
//   const message = await Message.findOne({
//     sendTo: req.params.id,
//     sentBy: req.user._id,
//   });

//   if (!message) return res.status(404).send('No message found');

//   return res.status(200).send(message);
// };

// exports.getMessages = async (req, res) => {
//   const messages = await Message.find({
//     sendTo: req.user._id,
//   }).populate('sendTo sentBy');

//   const result = messages.map((message) => ({
//     ..._.pick(message, ['message']),
//     ..._.pick(message, ['_id']),
//     sendTo: _.get(message, 'sendTo.credentials.name'),
//     sentBy: _.get(message, 'sentBy.credentials.name'),
//   }));

//   if (!messages) return res.status(404).send('No messages found for the
//   user'); return res.status(200).send(result);
// };

// exports.writeMessage = async (req, res) => {
//   const { sendTo, message } = req.body;
//   if (_.isEqual(sendTo, req.user._id)) {
//     return res.status(400).send('sendTo cannot be equal to sender ID');
//   }
//   const validateReceiver = await User.findById(sendTo);
//   if (!validateReceiver) return res.status(404).send('Invalid Receiver
//   ID..');

//   // const doneAlready = await Message.findOne({ sendTo, sentBy });
//   // if (doneAlready) await Message.findByIdAndDelete(doneAlready._id);

//   let content = new Message({
//     sendTo,
//     sentBy: req.user._id,
//     message,
//   });
//   await content.save();
//   content = content.populate('sendTo sendBy');
//   return res.send(content);
// };

exports.updateMessage = async (req, res) => {
  const filter = {
    sendTo: req.body.sendTo,
    sentBy: req.user._id,
  };
  const message = await Message.findOneAndUpdate(
    filter,
    { message: req.body.message },
    { new: true, upsert: true },
  );
  return res.status(200).send(message);
};

exports.deleteMessage = async (req, res) => {
  const message = await Message.findOneAndDelete({
    sentBy: req.user._id,
    sendTo: req.params.id,
  });
  if (!message) return res.status(404).send('No message for the user in DB!');
  return res.status(200).send('Message Deleted!');
};
