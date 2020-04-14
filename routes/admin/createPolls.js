// eslint-disable-next-line import/newline-after-import
const express = require('express');
const router = express.Router();
const {Poll, validate} = require('../../models/admin/polls');

router.get('/', async (req, res) => {
  const pollQuestions = await Poll.find();
  res.send(pollQuestions);
});

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  // Check if the questions already exists
  // let pollQuestion = await Poll.find({ question: req.body.question });
  // if (pollQuestion) return res.status(400).send('Question already exists in
  // the DB..'); Create Question
  let pollQuestion = new Poll({
    question : req.body.question,
  });
  await pollQuestion.save();
  pollQuestion = await Poll.find();
  return res.send(pollQuestion);
});

router.delete('/:id', async (req, res) => {
  let pollQuestion = await Poll.findById(req.params.id);
  if (!pollQuestion) {
    return res.status(400).send(
        'Question with the given id doesnt exist in the db');
  }
  await pollQuestion.delete();
  pollQuestion = await Poll.find();
  return res.send(pollQuestion);
});
module.exports = router;
