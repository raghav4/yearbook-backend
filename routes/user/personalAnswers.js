const express = require('express');
const router = express.Router();
const { Answer, validate } = require('../../models/user/personalAnswers');
const { User } = require('../../models/user/user');
const { Question } = require('../../models/admin/question');

router.get('/:id', async (req, res) => {
  // Get all the answers with the given user id,
  const answers = await Answer.find({
    userId: req.params.id,
  }).populate('questionId userId');
  return res.status(200).send(answers);
});

// Post an answer
// If answer already exits do not post
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { answer, userId, questionId } = req.body;

  const validateUserId = await User.findById(userId);
  const validateQuestionId = await Question.findById(questionId);

  if (!validateUserId) return res.status(400).send('Invalid UserId');
  if (!validateQuestionId) return res.status(400).send('Invalid QuestionId');

  // let userAnswer = await Answer.findById({
  //   questionId: req.params.questionId,
  //   userId: req.params.userId,
  // });
  // if (!userAnswer.answer)
  //   return res
  //     .status(400)
  //     .send('Answer already exits, either update or delete if you wish.');
  const userAnswer = new Answer({
    answer,
    userId,
    questionId,
  });
  await userAnswer.save();
  return res.status(200).send(userAnswer);
});

// Update the answer

router.put('/:id', async (req, res) => {
  const answer = await Answer.findByIdAndUpdate(
    req.params.id,
    {
      answer: req.body.answer,
    },
    { new: true }
  );
  if (!answer)
    return res.status(400).send('Answer with the given id does not exists');
  return res.status(200).send(answer);
});

module.exports = router;
