const _ = require('lodash');
const bcrypt = require('bcryptjs');
const debug = require('debug')('app:admin.controller.js');
const { Admin } = require('../models/admin');
const { Answer } = require('../models/user');
const Question = require('../models/admin/question.model');

exports.logInAdmin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({
    username,
  });
  if (!admin) return res.status(400).send('Invalid username or password');

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) return res.status(401).send('Invalid username or Password');

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
  } catch (ex) {
    debug(ex);
  }
  return res.status(200).send(admin);
};

exports.getUserQuestions = async (req, res) => {
  const questions = await Question.find();
  if (!questions.length) return res.status(404).send('No Questions found');
  return res
    .status(200)
    .send(_.map(questions, _.partialRight(_.pick, ['_id', 'title'])));
};

exports.getSingleQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) return res.status(404).send('Question not found');
  return res.status(200).send(question);
};

exports.addUserQuestion = async (req, res) => {
  let question = await Question.findOne({ title: req.body.question });

  if (question) return res.status(400).send('Question Already Exists');
  question = new Question({
    title: req.body.question,
  });

  await question.save();

  return res.status(200).send(question);
};

// * Commenting this will crash the site.

// exports.grantAccess = async (req, res) => {
//   const user = await UserAccess.findOne({ email: req.body.email });
//   if (user) return res.status(400).send('Request already granted');

//   const newUserAccess = new UserAccess({
//     email: req.body.email,
//     name: req.body.name || '',
//   });

//   await newUserAccess.save();
//   return res.status(201).send('Successfully granted registeration rights!');
// };

// exports.addPollQuestion = async (req, res) => {};

exports.deleteQuestion = async (req, res) => {
  // #TODO: #20 Do not delete/update question if anyone of the people has
  // answered
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(400).send('Question not found');
  // Delete all answers of respective questions
  await Answer.deleteMany(req.params.id);
  await question.delete();

  return res.status(200).send('Successfully Deleted Question');
};
