require('dotenv').config();
const config = require('config');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const imgBBUploader = require('imgbb-uploader');
const { User, Answer, Message } = require('../models');

class Controller {
  static async userLogIn(req, res) {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(400).send('Invalid userId or Password');
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(401).send('Invalid userId or Password');
    }

    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send('Successfully Logged-in!');
  }

  // !! Incomplete
  //   static async userSignUp(req, res) {
  //     const { userId, password } = req.body;
  //     const user = await User.findOne({ userId });
  //     if (user) {
  //       return res.status(400).send('User Already Exists!');
  //     }
  //   }

  static async getUserById(req, res) {
    let user = await User.findById(req.user._id);
    user.credentials = _.omit(user.credentials, 'password');
    user = _.pick(user, ['credentials', 'info', 'deptSection', 'socialHandles', '_id']);
    if (!user) {
      return res.status(404).send('User not found!');
    }
    return res.status(200).send(user);
  }

  static async updateUserDetails(req, res) {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('User not found');
    }
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
    user = _.pick(user, ['credentials', 'info', 'deptSection', 'socialHandles', '_id']);
    return res.status(200).send(user);
  }

  /**
   * Function to get all the users of a class.
   */

  static async getAllUsersOfAClass(req, res) {
    const user = await User.findById(req.user._id);
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user._id } },
        { deptSection: user.deptSection },
      ],
    });
    return res.status(200).send(users);
  }

  /**
   * Function to get all the users.
   * This function doesn't return 404 in case of no users exist.
   */
  static async getAllUsers(req, res) {
    const users = await User.find({ _id: { $ne: req.user._id } });
    return res.status(200).send(users);
  }

  /**
   * Function to create a Message
   */
  static async writeAMessage(req, res) {
    const { receiverId, content } = req.body;
    if (_.isEqual(receiverId, req.user._id)) {
      return res.status(400).send('User trying to write a message to self!');
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).send('Invalid receiverId!');

    // const doneAlready = await Message.findOne({ receiverId, senderId });
    // if (doneAlready) await Message.findByIdAndDelete(doneAlready._id);

    let message = new Message({
      receiverId,
      senderId: req.user._id,
      content,
    });
    await message.save();
    message = message.populate('receiverId sendBy');
    return res.status(201).send(message);
  }

  /**
   * Function to get all messages of a user by receiverId.
   */
  static async getAllMessagesReceivedByUserId(req, res) {
    const messages = await Message.find({
      receiverId: req.user._id,
    }).populate('senderId receiverId');

    if (!messages) {
      // Status 200 instead of 404 here.
      return res.status(200).send('No messages found for the user!');
    }

    const result = messages.map((message) => ({
      ..._.pick(message, ['_id']),
      ..._.pick(message, ['content']),
      senderId: _.get(message, 'senderId.credentials.name'),
      receiverId: _.get(message, 'receiverId.credentials.name'),
    }));

    return res.status(200).send(result);
  }

  /**
   * Function to get all messages of a user by senderId.
   */
  static async getMessageByReceiverId(req, res) {
    const message = await Message.findOne({
      receiverId: req.params.id,
      senderId: req.user._id,
    });

    if (!message) {
      return res.status(404).send('No message found');
    }
    return res.status(200).send(message);
  }
}

module.exports = Controller;
