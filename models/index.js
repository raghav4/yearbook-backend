/* eslint-disable global-require */
const model = {
  Poll: require('./poll'),
  Vote: require('./vote'),
  User: require('./user'),
  Admin: require('./admin'),
  Message: require('./message'),
  Question: require('./slambookQuestion'),
  Answer: require('./slambookAnswer'),
};

module.exports = model;
