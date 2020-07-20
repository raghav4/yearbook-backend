const csvtojsonV2 = require('csvtojson/v2');
const debug = require('debug')('app:userAccessController');
const GrantUserAccess = require('../../models/grantUserAcess');

exports.grantAccess = async (req, res) => {
  debug(
      'function: grantAccess(), Purpose : Route to grant access to a email of a user',
  );

  const user = await GrantUserAccess.findOne({email : req.body.email});
  if (user)
    return res.status(400).send('Request already granted');

  const userAccess = new GrantUserAccess({
    email : req.body.email,
    name : req.body.name || '',
  });

  await userAccess.save();
  return res.status(201).send('Successfully granted registeration rights!');
};

exports.batchAccess = async (req, res) => {
  debug(
      'function: batchAccess(), Purpose : Route to grant access to batch of emails provided in csv/json',
  );

  const usersJSON = await csvtojsonV2().fromFile('csvFILEPATH');
  await GrantUserAccess.insertMany(usersJSON);

  return res.status(201).send(
      'Successfully granted registeration rights to the batch!');
};
