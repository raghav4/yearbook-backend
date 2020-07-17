const _ = require('lodash');
const debug = require('debug')('app:message.controller.js');
const { Message } = require('../../models');

exports.getMessages = async (req, res) => {
  debug('Function : getMessages()');
  const messages = await Message.find({
    sendTo: req.user._id,
  }).populate('sendTo sentBy');

  const result = messages.map((message) => ({
    ..._.pick(message, ['message']),
    ..._.pick(message, ['_id']),
    sentBy: _.get(message, 'sentBy.credentials.name'),
  }));

  if (!messages) return res.status(404).send('No messages found for the user');
  return res.status(200).send(result);
};

exports.getMessageById = async (req, res) => {
  debug('Function : getMessageById()');
  const message = await Message.findOne({
    sendTo: req.params.id,
    sentBy: req.user._id,
  });

  if (!message) return res.status(404).send('No message found');

  return res.status(200).send(message);
};

exports.upsertMessage = async (req, res) => {
  debug('Function : upsertMessage(), Purpose : Route to upsert a Message');
  const filter = {
    sendTo: req.body.sendTo,
    sentBy: req.user._id,
  };
  const message = await Message.findOneAndUpdate(
    filter,
    { message: req.body.message },
    { new: true, upsert: true },
  );
  return res.status(200).send(message);
};

exports.deleteMessage = async (req, res) => {
  debug('Function : deleteMessage(), Purpose : Route to delete a Message');
  const message = await Message.findOneAndDelete({
    sentBy: req.user._id,
    sendTo: req.params.id,
  });

  if (!message) return res.status(404).send('No message for the user in DB!');
  return res.status(200).send('Message Deleted!');
};
