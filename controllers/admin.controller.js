const bcrypt = require('bcryptjs');
const { Admin } = require('../models/admin');
const { Question } = require('../models/admin/question');

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
  // Only super admin can register further admins,
  if (!req.admin.isSuperAdmin) {
    return res.status(401).send('Unauthroized request');
  }

  const { username, password } = req.body;
  const admin = new Admin({ username, password });

  try {
    const salt = await bcrypt.genSalt(15);
    admin.password = await bcrypt.hash(admin.password, salt);
    await admin.save();
  } catch (ex) {
    console.log(ex.response);
  }
  return res.status(200).send(admin);
};

exports.getUserQuestions = async (req, res) => {
  const questions = await Question.find();
  if (!questions.length) return res.status(404).send('No Questions found');
  res.status(200).send(questions);
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

// exports.addPollQuestion = async (req, res) => {};

exports.deleteQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    return res.status(400).send('No Question exists with the Given id');
  }
  await question.delete();
  return res.status(200).send('Successfully Deleted Question');
};
