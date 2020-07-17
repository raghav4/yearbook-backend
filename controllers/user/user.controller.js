/* eslint-disable operator-linebreak */
require('dotenv').config();
const _ = require('lodash');
const config = require('config');
const bcrypt = require('bcryptjs');
const imgBBUploader = require('imgbb-uploader');
const debug = require('debug')('app:user.controller.js');
const { User } = require('../../models/user');

exports.getUser = async (req, res) => {
  debug('Function : getUser(), Purpose : Route to get all user information');
  let user = await User.findById(req.user._id);
  user.credentials = _.omit(user.credentials, 'password');
  user = _.pick(user, [
    'credentials',
    'info',
    'deptSection',
    'socialHandles',
    '_id',
  ]);

  if (!user) return res.status(400).send('User not found');

  return res.status(200).send(user);
};

exports.getClassUsers = async (req, res) => {
  debug('Function : getClassUsers(), Purpose : Route to get all the class users');
  const user = await User.findById(req.user._id);
  let users = await User.find({
    $and: [{ _id: { $ne: req.user._id } }, { deptSection: user.deptSection }],
  });
  users = _.map(users, _.partialRight(_.pick, ['_id', 'credentials.name']));
  return res.send(users);
};

exports.updateUserDetails = async (req, res) => {
  debug('Function : udpateUser(), Purpose : Route to update the user details');
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).send('Invalid User ID...');
  const { socialHandles } = req.body;

  if (req.body.info) {
    user.info.bio = req.body.info.bio;
  }
  user.socialHandles.instagram =
    socialHandles.instagram || user.socialHandles.instagram;
  user.socialHandles.facebook =
    socialHandles.facebook || user.socialHandles.facebook;
  user.socialHandles.linkedin =
    socialHandles.linkedin || user.socialHandles.linkedin;
  user.socialHandles.snapchat =
    socialHandles.snapchat || user.socialHandles.snapchat;
  user.contactEmail = socialHandles.contactEmail || user.socialHandles.contactEmail;
  user.contactNo = socialHandles.contactNo || user.socialHandles.contactNo;
  user.whatsappNo = socialHandles.whatsappNo || user.socialHandles.whatsappNo;

  await user.save();
  user.credentials = _.omit(user.credentials, ['password']);
  return res
    .status(200)
    .send(
      _.pick(user, ['credentials', 'deptSection', 'socialHandles', 'info', 'bio']),
    );
};

// eslint-disable-next-line consistent-return
exports.updateUserProfilePicture = async (req, res) => {
  debug(
    `function: UpdateUserProfilePicture(), Purpose: to update the profile picture, files: ${req.files}`,
  );
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).send('No user found!');

  if (req.files === null) {
    return res.status(400).send('Please send a valid file');
  }
  const { file } = req.files;
  // TODO: Fix Relative Path
  file.mv(`${__dirname}/../../tmp/${file.name}`, async (err) => {
    if (err) {
      debug('Error encountered : ', err.message);
      return res.status(500).send(err);
    }
    try {
      const { url } = await imgBBUploader(
        config.get('IMGBBKEY'),
        `${__dirname}/../../tmp/${file.name}`,
      );
      user.info.profilePicture = url;
      await user.save();
      return res.status(200).send(url);
    } catch (ex) {
      return res.status(500).send(ex.message);
    }
  });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send('Invalid User ID');

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.credentials.password,
  );

  if (!validPassword) return res.status(401).send('Incorrect Password');
  if (req.body.password === req.body.newPassword) {
    return res.status(400).send('New Password cannot be equal to the last password');
  }
  const salt = await bcrypt.genSalt(15);
  user.credentials.password = await bcrypt.hash(req.body.newPassword, salt);

  await user.save();
  return res.status(200).send('Succesfully changed the password');
};

exports.getAllUsers = async (req, res) => {
  debug('Function : getAllUsers(), Purpose : Route to get all the registered Users');
  const users = await User.find({ _id: { $ne: req.user._id } });

  if (!users.length) return res.status(404).send('No User is there in the DB');
  return res.status(200).send(users);
};
