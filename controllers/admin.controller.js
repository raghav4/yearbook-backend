const { Question } = require('../models/admin/question');

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
