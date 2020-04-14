// Route to Write a message for a person
// eslint-disable-next-line import/newline-after-import
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { WritingContent, validate } = require('../../../models/writeFor');
const { User } = require('../../../models/user/userDetails');

// List all the content written for a user with the given id
router.get('/:id', async (req, res) => {
  const content = await WritingContent.find({
    userId: req.params.id,
  }).populate('authorId userId', 'name department section -_id');
  if (!content) return res.send('Nothing found for the user');
  return res.send(content);
});

// Write for the user
router.post('/', async (req, res) => {
  const { authorId, userId, message } = req.body;
  if (_.isEqual(authorId, userId)) {
    return res.status(400).send('authorId cannot be equal to userId');
  }
  const validateAuthorId = await User.findById(authorId);
  const validateUserId = await User.findById(userId);
  if (!validateAuthorId) return res.status(404).send('Invalid AuthorId');
  if (!validateUserId) return res.status(404).send('Invalid UserId');

  const doneAlready = await WritingContent.findOne({ authorId, userId });
  // eslint-disable-next-line no-underscore-dangle
  if (doneAlready) await WritingContent.findByIdAndDelete(doneAlready._id);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const content = new WritingContent({
    authorId,
    userId,
    message,
  });
  await content.save();
  return res.send(content);
});

module.exports = router;
