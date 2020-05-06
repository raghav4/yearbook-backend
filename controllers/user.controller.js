const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const { validateUserInfo } = require('../utils/user');
const { LogInValidation } = require('../utils/common/login');

exports.loginUser = async (req, res) => {
  const { error } = LogInValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({
    'credentials.email': email,
  });
  if (!user) {
    return res.status(400).send('No user exists with the given email account');
  }

  const validPassword = await bcrypt.compare(
    password,
    user.credentials.password,
  );
  if (!validPassword) return res.status(401).send('Invalid Password');

  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send('Login Successful');
};
exports.getUser = async (req, res) => {
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

exports.updateUser = async (req, res) => {
  const { error } = validateUserInfo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('User not found');

  user = await User.findByIdAndUpdate(
    req.user._id,
    {
      info: {
        bio: req.body.body || user.info.bio,
        profilePicture: req.body.profilePicture || user.info.profilePicture,
      },
      socialHandles: {
        contactEmail: req.body.email || user.socialHandles.contactEmail,
        contactNo: req.body.contactNo || user.socialHandles.contactNo,
        whatsappNo: req.body.whatsappNo || user.socialHandles.whatsappNo,
        linkedin: req.body.linkedin || user.socialHandles.linkedin,
        instagram: req.body.instagram || user.socialHandles.instagram,
        facebook: req.body.facebook || user.socialHandles.facebook,
        snapchat: req.body.snapchat || user.socialHandles.snapchat,
      },
    },
    {
      new: true,
    },
  );
  user.credentials = _.omit(user.credentials, 'password');
  user = _.pick(user, [
    'credentials',
    'info',
    'deptSection',
    'socialHandles',
    '_id',
  ]);
  return res.status(200).send(user);
};
