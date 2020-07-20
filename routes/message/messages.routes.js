const express = require('express');
const { user } = require('../routes.json');
const { validateMessage } = require('../../validation');
const { messageController } = require('../../controllers');
const { validator, validateObjectId, auth } = require('../../middlewares');

const router = express.Router();
const { message } = user;

router.get(message.getAllOfUser, auth, messageController.getMessages);

router.get(
  message.getById,
  [auth, validateObjectId],
  messageController.getMessageById,
);

router.put(
  message.addOrUpdate,
  [auth, validator(validateMessage)],
  messageController.upsertMessage,
);

router.delete(
  message.deleteById,
  [auth, validateObjectId],
  messageController.deleteMessage,
);

module.exports = router;
