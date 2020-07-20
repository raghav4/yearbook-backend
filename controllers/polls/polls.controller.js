const debug = require('debug')('app:pollsController');
const { Poll, Vote } = require('../../models');

exports.getAllPolls = async (req, res) => {
  debug('function: getAllPolls(), Purpose : Route to get all poll question');
  const questions = await Poll.find({});
  return res.status(200).send(questions);
};

exports.getPollById = async (req, res) => {
  debug('function: getPollById(), Purpose: Route to get a poll by pollID');
  const question = await Poll.findById(req.params.id);
  if (!question) return res.status(404).send('No Question found with the given ID.');

  return res.status(200).send(question);
};

exports.createPoll = async (req, res) => {
  debug('function: createPoll(), Purpose: Route to create a Poll Question');

  const question = new Poll({ title: req.body.question });
  await question.save();
  return res.status(201).send(question);
};

exports.deletePoll = async (req, res) => {
  debug('function: deletePoll(), Purpose: Route to delete a Poll Question');

  const question = await Poll.findById(req.params.id);
  if (!question) return res.status(400).send('Question not found');

  const votes = await Vote.find({ pollId: req.params.id });
  if (votes) {
    return res
      .status(400)
      .send(`This Poll has already been answered by ${votes.length} people`);
  }
  await question.delete();
  return res.status(200).send('Question Deleted Successfully');
};
