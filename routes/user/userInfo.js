const express = require('express');
const router = express.Router();
const _ = require('lodash');
const cloudinary = require('cloudinary').v2;
const { User, validate, putValidate } = require('../../models/user/user');

router.get('/', async (req, res) => {
  const user = await User.find({});
  if (!user.length) return res.status(404).send('DB is empty!');
  res.send(user);
});

// router.post('/', async (req, res) => {
//   // Look at the validation!!
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   // how does the user already exists?
//   let user = await User.findOne({
//     phoneNumber: req.body.phoneNumber, // or do signup using mobile number?
//     // Same user with two mobiles? one mobiel for two user?
//   });
//   if (!user) return res.status(404).send('User already exists in the DB..');

//   user = new User({
//     name: req.body.name,
//     dp: req.body.dp,
//     department: req.body.department,
//     section: req.body.section,
//     whatsappNo: req.body.whatsappNo,
//     facebook: req.body.facebook,
//     linkedin: req.body.linkedin,
//     email: req.body.email,
//   });
//   return res.status(200).send(user);
// });

router.put('/:id', async (req, res) => {
  const { error } = putValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name || user.name,
      dp: req.body.dp || user.dp,
      department: req.body.department || user.department,
      section: req.body.section || user.section,
      whatsappNo: req.body.whatsappNo || user.whatsappNo,
      facebook: req.body.facebook || user.facebook,
      linkedin: req.body.linkedin || user.linkedin,
      email: req.body.email || user.email,
    },
    { new: true }
  );
  if (!user) return res.status(404).send('User not found with the given id');
  return res.status(200).send(user);
});

module.exports = router;
