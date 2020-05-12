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

exports.updateAnswer = async (req, res) => {
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
