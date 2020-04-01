const express = require('express');
const router = express.Router();
const { WritingContent, validate } = require('../models/writeFor');
const { User } = require('../models/user/user');

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
  const validateAuthorId = await User.findById(authorId);
  const validateUserId = await User.findById(userId);
  if (!validateAuthorId) return res.status(404).send('Invalid AuthorId');
  if (!validateUserId) return res.status(404).send('Invalid UserId');
  // Make sure the user has not already written anything before.

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
