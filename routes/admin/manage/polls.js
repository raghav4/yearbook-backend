// eslint-disable-next-line import/newline-after-import
const express = require('express');
const router = express.Router();
const { Poll, validate } = require('../../../models/admin/polls');

/**
 * Route to get all the Poll Questions
 * Returns Status Code - 200
 */
router.get('/', async (req, res) => {
  const pollQuestions = await Poll.find();
  res.status(200).send(pollQuestions);
});

/**
 * Route to get a Question with a given ID
 * Get a Question with the given question ID
 * Returns 404 Status Code if no question with the given ID is found.
 * Returns 200 Status Code if question is found along with the question.
 */

router.get('/:id', async (req, res) => {
  const question = await Poll.findById(req.params.id);
  if (!question) return res.status(404).send('No Question found with the provided ID.');
  return res.status(200).send(question);
});
/**
 * Route to get the Poll Question with the Given ID
 * Returns Status Code - 200 after adding a question successfully
 */
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // TODO: Check if the questions already exists

  // Create Question
  let pollQuestion = new Poll({
    question: req.body.question,
  });
  await pollQuestion.save();
  pollQuestion = await pollQuestion.find();
  return res.status(200).send(pollQuestion);
});

/**
 * Route to delete a Question
 * Returns Status Code - 200 after deleting a question successfully
 */
router.delete('/:id', async (req, res) => {
  let pollQuestion = await Poll.findById(req.params.id);
  if (!pollQuestion) {
    return res.status(400).send('Question with the given id doesnt exist in the db');
  }
  await pollQuestion.delete();
  pollQuestion = await Poll.find();
  return res.status(200).send(pollQuestion);
});
module.exports = router;
