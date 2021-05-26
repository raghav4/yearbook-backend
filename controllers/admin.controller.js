const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { Admin } = require('../models/admin');
const { AllowedUsers } = require('../models/grantAccess');
const { Question } = require('../models/slambookQuestion');

exports.logInAdmin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({
    username,
  });
  if (!admin) return res.status(400).send('Invalid username or password');

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    return res.status(401).send('Invalid username or Password');
  }

  const token = admin.generateAuthToken();
  return res.header('x-auth-token', token).send('Login Successful');
};

exports.registerAdmin = async (req, res) => {
  if (!req.admin.isSuperAdmin) return res.status(401).send('Access Denied!');

  const { username, password } = req.body;
  const admin = new Admin({ username, password });

  try {
    const salt = await bcrypt.genSalt(15);
    admin.password = await bcrypt.hash(admin.password, salt);
    await admin.save();
  } catch (ex) {}
  return res.status(200).send(admin);
};

exports.getUserQuestions = async (req, res) => {
  const questions = await Question.find();
  if (!questions.length) return res.status(404).send('No Questions found');
  return res
    .status(200)
    .send(_.map(questions, _.partialRight(_.pick, ['_id', 'question'])));
};

exports.getSingleQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) return res.status(404).send('Question not found');
  return res.status(200).send(question);
};

exports.addUserQuestion = async (req, res) => {
  let question = await Question.findOne({ question: req.body.question });

  if (question) return res.status(400).send('Question Already Exists');
  question = new Question({
    question: req.body.question,
  });

  await question.save();

  return res.status(200).send(question);
};

exports.grantAccess = async (req, res) => {
  const { phoneNumber } = req.body;

  let user = await AllowedUsers.findOne({ phoneNumber });

  if (user) return res.status(400).send('Number already registered');

  user = new AllowedUsers({
    phoneNumber,
  });

  await user.save();

  return res.status(200).send('Successfully added Number');
};
// exports.addPollQuestion = async (req, res) => {};

exports.deleteQuestion = async (req, res) => {
  // #TODO: #20 Do not delete/update question if anyone of the people has answered
  const question = await Question.findById(req.params.id);
  if (!question) {
    return res.status(400).send('No Question exists with the Given id');
  }
  await question.delete();
  return res.status(200).send('Successfully Deleted Question');
};
