const { Poll } = require('../../models/admin');

exports.getAllPolls = async (req, res) => {
  const questions = await Poll.find({});
  return res.status(200).send(questions);
};

exports.getPollById = async (req, res) => {
  const question = await Poll.findById(req.params.id);
  if (!question) return res.status(404).send('No Question found with the given ID.');
  return res.status(200).send(question);
};

exports.createPoll = async (req, res) => {
  const question = new Poll({ title: req.body.question });
  await question.save();
  return res.status(201).send(question);
};

exports.deletePoll = async (req, res) => {
  const question = await Poll.findById(req.params.id);
  if (!question) return res.status(400).send('Question not found');

  await question.delete();
  return res.status(200).send('Question Deleted Successfully');
};
