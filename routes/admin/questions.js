const experss = require('express');
const { Question, validate } = require('../../models/admin/question');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/admin');

const router = experss.Router();

router.get('/', auth, async (req, res) => {
  const questions = await Question.find();
  res.status(200).send(questions);
});

router.get('/:id', auth, async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).send('No Question found with the provided ID.');
  return res.status(200).send(question);
});

router.post('/', [auth, isAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // TODO: Check if the question already exists,

  // Adding a New Question
  let question = new Question({
    question: req.body.question,
  });
  await question.save();
  question = await Question.find();
  return res.status(200).send(question);
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {
  let question = await Question.findById(req.params.id);
  if (!question) {
    return res.status(400).send('Question with the given id doesnt exist in the db');
  }
  await question.delete();
  question = await Question.find();
  return res.status(200).send(question);
});

module.exports = router;
