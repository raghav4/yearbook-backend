require('dotenv').config();
const config = require('config');
const _ = require('lodash');
const imgBBUploader = require('imgbb-uploader');
const { User } = require('../../models/user');

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

exports.getClassUsers = async (req, res) => {
  const user = await User.findById(req.user._id);
  let users = await User.find({
    $and: [{ _id: { $ne: req.user._id } }, { deptSection: user.deptSection }],
  });
  users = _.map(users, _.partialRight(_.pick, ['_id', 'credentials.name']));
  return res.send(users);
};

exports.updateUser = async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('User not found');

  const { info, socialHandles } = req.body;

  user = await User.findByIdAndUpdate(
    req.user._id,
    {
      info: {
        bio: info.bio,
        profilePicture: user.info.profilePicture,
      },
      socialHandles,
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
