const express = require('express');
const { Poll, validate } = require('../../../models/admin/polls');
const auth = require('../../../middlewares/auth');
const isAdmin = require('../../../middlewares/admin');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const pollQuestions = await Poll.find();
  res.status(200).send(pollQuestions);
});

router.get('/:id', auth, async (req, res) => {
  const question = await Poll.findById(req.params.id);
  if (!question) return res.status(404).send('No Question found with the provided ID.');
  return res.status(200).send(question);
});

router.post('/', [auth, isAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // TODO #11: Check if the questions already exists

  const pollQuestion = new Poll({
    question: req.body.question,
  });
  await pollQuestion.save();
  return res.status(200).send('Question Added Successfully');
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {
  let pollQuestion = await Poll.findById(req.params.id);
  if (!pollQuestion) {
    return res.status(400).send('Question with the given id doesnt exist in the db');
  }
  await pollQuestion.delete();
  pollQuestion = await Poll.find();
  return res.status(200).send(pollQuestion);
});
module.exports = router;
