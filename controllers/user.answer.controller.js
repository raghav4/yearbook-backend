const _ = require('lodash');
const { Answer } = require('../models/user');

exports.allAnswered = async (req, res) => {
  const answers = await Answer.find({
    userId: req.user._id,
  })
    .select('-userId -__v')
    .populate('questionId');
  if (!answers) return res.status(404).send('No answers found');
  return res.status(200).send(answers);
};

exports.addAnswer = async (req, res) => {
  const { questionId, answer } = req.body;

  let addAnswer = await Answer.findOne({ questionId, userId: req.user._id });
  if (addAnswer) {
    return res
      .status(400)
      .send('Answer exists already, try Updating it or delete it');
  }

  addAnswer = new Answer({
    questionId,
    userId: req.user._id,
    answer,
  });

  await addAnswer.save();
  return res.status(200).send('Successfully added answer');
};

exports.updateAnswer = async (req, res) => {
  const { questionId, answer } = req.body;

  const addAnswer = await Answer.findOne({ questionId, userId: req.user._id });
  if (!addAnswer) {
    return res
      .status(404)
      .send('No answer found with the given question id and user id.');
  }

  addAnswer.answer = answer;

  await addAnswer.save();

  return res.status(200).send('Updated answer');
};

exports.deleteAnswer = async (req, res) => {
  const answer = await Answer.findOneAndDelete(req.params.id);

  if (!answer) return res.status(404).send('Answer not found');
  return res.status(200).send('Deleted answer');
};
