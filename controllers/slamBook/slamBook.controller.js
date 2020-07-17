const _ = require('lodash');
const { Question } = require('../../models/admin');
const { Answer } = require('../../models/user');

exports.getAllSlamBookQuestions = async (req, res) => {
  const questions = await Question.find();
  if (!questions.length) return res.status(404).send('No Questions found');
  return res
    .status(200)
    .send(_.map(questions, _.partialRight(_.pick, ['_id', 'title'])));
};

exports.getQuestionById = async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) return res.status(404).send('Question not found');
  return res.status(200).send(question);
};

exports.addSlamBookQuestion = async (req, res) => {
  let question = await Question.findOne({ title: req.body.question });

  if (question) return res.status(400).send('Question Already Exists');
  question = new Question({
    title: req.body.question,
  });

  await question.save();

  return res.status(200).send(question);
};

exports.deleteSlamBookQuestion = async (req, res) => {
  // #TODO: #20 Do not delete/update question if anyone of the people has
  // answered
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(400).send('Question not found');
  // Delete all answers of respective questions
  await Answer.deleteMany(req.params.id);
  await question.delete();

  return res.status(200).send('Successfully Deleted Question');
};

exports.answers = async (req, res) => {
  const answers = await Answer.find({
    userId: req.user._id,
  })
    .select('-userId -__v')
    .populate('questionId');
  if (!answers) return res.status(404).send('No answers found');
  return res.status(200).send(answers);
};

exports.upsertAnswer = async (req, res) => {
  const { questionId, answer } = req.body;
  const userAnswer = await Answer.findOneAndUpdate(
    { questionId, userId: req.user._id },
    { answer },
    { new: true, upsert: true },
  );

  return res.status(200).send(userAnswer);
};

exports.deleteAnswer = async (req, res) => {
  const answer = await Answer.findOneAndDelete(req.params.id);

  if (!answer) return res.status(404).send('Answer not found');
  return res.status(200).send('Deleted answer');
};
