const express = require('express');
const {auth} = require('../../middlewares/user');
const {PollStats} = require('../../models/admin/pollStats');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let pollVote = await PollStats.find({
    votedBy : req.body.votedBy,
    votedFor : req.body.votedFor,
  });

  if (pollVote.length)
    return res.send(pollVote[0]);

  // Check if the votedFor person already has some votes, if yes then increment
  // it!

  pollVote = new PollStats({
    questionId : req.body.questionId,
    votedBy : req.body.votedBy,
    votedFor : req.body.votedFor,
    voteCountsByPerson : 1,
  });

  await pollVote.save();
  return res.send(pollVote);
});

module.exports = router;
