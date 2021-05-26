require('dotenv').config();
const config = require('config');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const imgBBUploader = require('imgbb-uploader');
const { User, Answer, Message, Question, Poll } = require('../models');

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

  static async userSignUp(req, res) {
    // eslint-disable-next-line object-curly-newline
    const { userId, name, password, department, section } = req.body;
    const data = await User.findOne({ userId });
    if (data) {
      return res.status(400).send('User Already Exists!');
    }
    const user = new User({
      userId,
      password,
      name,
      department,
      section,
    });

    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    return res
      .status(201)
      .send(_.pick(user, ['userId', 'name', 'department', 'section']));
  }

  static async getUserById(req, res) {
    let user = await User.findById(req.user._id);
    user.credentials = _.omit(user.credentials, 'password');
    user = _.pick(user, ['credentials', 'info', 'deptSection', 'socialHandles', '_id']);
    if (!user) {
      return res.status(404).send('User not found!');
    }
    return res.status(200).send(user);
  }

  // TODO: #40 Fix user metadata

  static async updateUserDetails(req, res) {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).send('Invalid User Id');
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
        { _id: { $ne: req.user._id } }, { department: user.department, section: user.section }],
    });
    return res.status(200).send(users.map((datum) => _.pick(datum, ['name', 'userId', 'profilePicture', '_id', 'bio'])));
  }

  /**
   * Function to get all the users.
   * This function doesn't return 404 in case of no users exist.
   */
  static async getAllUsers(req, res) {
    const users = await User.find({ _id: { $ne: req.user._id } });
    return res.status(200).send(users.map((datum) => _.pick(datum, ['name', 'userId', 'profilePicture', '_id', 'bio'])));
  }

  /**
   * Function to create a Message
   */
  static async createMessage(req, res) {
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
    message = message.populate('receiverId senderId');
    return res.status(201).send(message);
  }

  static async updateMessage(req, res) {
    const filter = {
      receiverId: req.body.receiverId,
      senderId: req.user._id,
    };

    const message = await Message.findOneAndUpdate(
      filter,
      { message: req.body.message },
      { new: true, upsert: true },
    );

    return res.status(200).send(message);
  }

  /**
   * Function to delete a message (Soft Delete)
   */
  static async deleteMessage(req, res) {
    const message = await Message.findOneAndUpdate({
      receiverId: req.params.id,
      senderId: req.user._id,
      isDeleted: true,
    });
    if (!message) {
      return res.status(404).send('Message does not exist!');
    }
    return res.status(200).send('Successfully deleted message!');
  }

  /**
   * Function to get all messages of a user by receiverId.
   */
  static async getAllReceivedMessages(req, res) {
    const messages = await Message.find({
      receiverId: req.user._id,
      isDeleted: false,
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
      isDeleted: false,
    });

    if (!message) {
      return res.status(404).send('No message found');
    }
    return res.status(200).send(message);
  }

  /**
   * Function to get all answers of a user.
   * !! No 404 for no answers.
   */
  static async getAllAnswersOfAUser(req, res) {
    const answers = await Answer.find({
      userId: req.user._id,
    })
      .select('-userId -__v')
      .populate('titleId');
    return res.status(200).send(answers);
  }

  /**
   * Function to add a new answer or update existing one.
   */
  static async upsertAnswer(req, res) {
    const { titleId, content } = req.body;
    const answer = await Answer.findOneAndUpdate(
      { titleId, userId: req.user._id },
      { content },
      { new: true, upsert: true },
    );
    return res.status(200).send(answer);
  }

  /**
   * Function to delete a slambook answer.
   */
  static async deleteAnswer(req, res) {
    const answer = await Answer.findOneAndDelete(req.params.id);
    if (!answer) {
      return res.status(404).send('Invalid answerId!');
    }
    return res.status(200).send('Successfully deleted answer!');
  }

  /**
   * Function to get a slambook question by questionId
   */
  static async getSlambookQuestionById(req, res) {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).send('Invalid Question ID!');
    }
    return res.status(200).send(question);
  }

  /**
   * Function to get all slambook questions
   */
  static async getAllSlambookQuestions(req, res) {
    const questions = await Question.find({});
    if (!questions && !questions.length) {
      return res
        .status(404)
        .send('Looks like there are no questions for the user to answer!');
    }
    return res
      .status(200)
      .send(_.map(questions, _.partialRight(_.pick, ['_id', 'title'])));
  }

  /**
   * Function to insert a slambook question.
   */
  static async createSlambookQuestion(req, res) {
    let question = await Question.findOne({
      title: new RegExp(`^${req.body.title}$`, 'i'),
    });

    if (question) {
      return res.status(400).send('Question already exist!');
    }
    question = new Question({
      title: req.body.title.trim(),
    });
    await question.save();
    return res.status(200).send(question);
  }

  /**
   * Delete a slambook question.
   * !! ADMIN ACCESS
   */
  static async deleteSlambookQuestion(req, res) {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(400).send('Invalid Question ID');
    }
    await question.delete();
    return res.status(200).send('Successfully deleted question!');
  }

  /**
   * Function to get a poll by pollId
   */
  static async getPollById(req, res) {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).send('Invalid Poll Id!');
    }
    return res.status(200).send(poll);
  }

  /**
   * Function to get all polls.
   * !! No 404 here.
   */
  static async getAllPolls(req, res) {
    const polls = await Poll.find({});
    return res.status(200).send(polls);
  }

  /**
   * Function to create a new poll.
   */
  static async createPoll(req, res) {
    const poll = new Poll({
      title: req.body.title,
    });

    await poll.save();
    return res.status(201).send('Successfully created poll!');
  }

  /**
   * Function to delete a poll.
   */
  static async deletePoll(req, res) {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(400).send('Invalid Poll Id');
    }
    await poll.delete();
    return res.status(200).send('Successfully deleted poll!');
  }
}

module.exports = Controller;
