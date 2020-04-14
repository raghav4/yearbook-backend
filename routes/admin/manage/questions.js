const experss = require('express');

const router = experss.Router();
const { Question, validate } = require('../../../models/admin/question');

// Route to get all the Personal Questions for the User.

router.get('/', async (req, res) => {
  const questions = await Question.find();
  res.status(200).send(questions);
});

/**
 * Route to get a Question with a given ID
 * Get a Question with the given question ID
 * Returns 404 if no question with the given id exists
 * Returns 200 along with the question if the question is found.
 */

router.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).send('No Question found with the provided ID.');
  return res.status(200).send(question);
});

/**
 * Route to add a new Question.
 *  This route add a Question to the Database and then return Status Code 200
 */

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // TODO: Check if the question already exists,

  // Adding a New Question
  const question = new Question({
    question: req.body.question,
  });
  await question.save();
  return res.status(200).send('Question Added Successfully!');
});

/**
 * Route to Delete a Question
 * This route will return Status Code 200 after the successful Deletion of the
 * question
 */
router.delete('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    return res.status(400).send('Question with the given id doesnt exist in the db');
  }
  await question.delete();
  return res.status(200).send('Question Deleted Successfully!');
});

module.exports = router;
