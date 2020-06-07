const { PollQuestion } = require('../../models/admin');

exports.getPollQuestions = async (req, res) => {
  const questions = await PollQuestion.find({});
  // if (!questions.length) return res.status(404).send('No Questions Found');
  return res.status(200).send(questions);
};

exports.getPollQuestionById = async (req, res) => {
  const question = await PollQuestion.findById(req.params.id);
  if (!question) return res.status(404).send('No Question found with the given ID.');
  return res.status(200).send(question);
};

exports.createPollQuestion = async (req, res) => {
  // let question = await PollQuestion.find({ question: req.body.question });
  // if (question) return res.status(400).send('Poll Question already exists');
  const question = new PollQuestion({ question: req.body.question });
  await question.save();
  return res.status(201).send(question);
};

exports.deletePollQuestion = async (req, res) => {
  const question = await PollQuestion.findById(req.params.id);
  if (!question) return res.status(400).send('Question with the given ID is not found');

  await question.delete();
  return res.status(200).send('Question Deleted Successfully');
};
