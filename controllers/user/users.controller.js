const { User } = require('../../models/user');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });

  if (!users.length) return res.status(404).send('No User is there in the DB');
  return res.status(200).send(users);
};
