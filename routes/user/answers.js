const express = require('express');
const auth = require('../../middlewares/auth');
const { Answer } = require('../../models/user');

const router = express.Router();

/*
 * Route to get the answered self questions by the user
 */

router.get('/', auth, async (req, res) => {
  const answers = await Answer.find({
    userId: req.user._id,
  }).populate('questionId userId');
  if (!answers) return res.status(404).send('No answers found');
  return res.status(200).send(answers);
});

/*
 * Adding an answer for a question (Self)
 */

router.post('/answer', auth, async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const { questionId, userId, answer } = req.body;

  let addAnswer = await Answer.findOne({ questionId, userId });
  if (addAnswer) {
    return res.status(400).send('Answer exists already, try Updating it or delete it');
  }
  addAnswer = new Answer({
    questionId,
    userId,
    answer,
  });
  await addAnswer.save();
  return res.status(200).send('Answer added successfully');
});

/*
 * Route to update an exising answer of a user (Self)
 */

router.put('/', auth, async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const { questionId, answer } = req.body;

  const addAnswer = await Answer.findOne({ questionId, userId: req.user._id });
  if (!addAnswer) {
    return res
      .status(404)
      .send('No answer found with the given question id and user id.');
  }

  addAnswer.answer = answer;
  await addAnswer.save();
});

/*
 * Route to delete an answer of a user (Self)
 */

router.delete('/:id', auth, async (req, res) => {
  const answer = await Answer.findOne({ _id: req.user._id, questionId: req.params.id });
});

module.exports = router;
