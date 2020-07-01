const csvtojsonV2 = require('csvtojson/v2');
const {UserAccess} = require('../models/access');
const {User} = require('../models/user');

exports.grantAccess = async (req, res) => {
  const user = await UserAccess.findOne({email : req.body.email});
  if (user)
    return res.status(400).send('Request already granted');

  const newUserAccess = new UserAccess({
    email : req.body.email,
    name : req.body.name || '',
  });

  await newUserAccess.save();
  return res.status(201).send('Successfully granted registeration rights!');
};

exports.batchAccess = async (req, res) => {
  //

  const usersJSON = await csvtojsonV2().fromFile('csvFILEPATH');

  await UserAccess.insertMany(usersJSON);

  return res.status(201).send(
      'Successfully granted registeration rights to the batch!');
};
