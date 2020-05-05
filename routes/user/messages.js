const _ = require('lodash');
const express = require('express');
const { Message } = require('../../models/user');
const { User } = require('../../models/user');
const auth = require('../../middlewares/auth');

const router = express.Router();

/*
 * Route to get all the messages written for a user
 */
router.get('/', auth, async (req, res) => {
  const messages = await Message.find({
    userId: req.user._id,
  }).populate('receiverId userId', 'name department section -_id');
  if (!messages) return res.status(404).send('No messages found for the user');
  return res.status(200).send(messages);
});

/*
 * Route to write a message for another user
 */
router.post('/', auth, async (req, res) => {
  const { receiverId, message } = req.body;
  if (_.isEqual(receiverId, req.user._id)) {
    return res.status(400).send('receiverId cannot be equal to userId');
  }
  const validateAuthorId = await User.findById(receiverId);
  if (!validateAuthorId) return res.status(404).send('Invalid receiverId');

  // const doneAlready = await Message.findOne({ receiverId, userId });
  // if (doneAlready) await Message.findByIdAndDelete(doneAlready._id);

  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const content = new Message({
    receiverId,
    userId: req.user._id,
    message,
  });
  await content.save();
  return res.send(content);
});

// router.put('/', async (req, res) => {
//   const {receiverId}
// });

router.delete('/', async (req, res) => {
  const { receiverId, userId } = req.body;
  const message = await Message.deleteOne({
    userId,
    receiverId,
  });
  if (!message) return res.status(404).send('No message found');
  return res.status(200).send('Deleted Message Successfully');
});

module.exports = router;
