const _ = require('lodash');
const debug = require('debug')('app:slamBookController');
const {SlamBookQuestion, SlamBookAnswer} = require('../../models');

exports.getAllSlamBookQuestions = async (req, res) => {
  debug(
      'function: getAllSlamBookQuestions(), Purpose: Route to get all the slambook questions',
  );
  const questions = await SlamBookQuestion.find();
  if (!questions.length)
    return res.status(404).send('No Questions found');

  return res.status(200).send(
      _.map(questions, _.partialRight(_.pick, [ '_id', 'title' ])));
};

exports.getQuestionById = async (req, res) => {
  debug(
      'function: getQuestionById(), Purpose: Route to get a question by questionID',
  );
  const question = await SlamBookQuestion.findById(req.params.id);

  if (!question)
    return res.status(404).send('Question not found');
  return res.status(200).send(question);
};

exports.addSlamBookQuestion = async (req, res) => {
  debug(
      'function: addSlamBookQuestion(), Purpose : Route to add a new Slam Book Question',
  );

  let question = await SlamBookQuestion.findOne({title : req.body.question});
  if (question)
    return res.status(400).send('Question Already Exists');

  question = new SlamBookQuestion({
    title : req.body.question,
  });

  await question.save();

  return res.status(200).send(question);
};

exports.deleteSlamBookQuestion = async (req, res) => {
  debug(
      'function: deleteSlamBookQuestion(), Purpose: Route to delete all the slam book question',
  );

  const question = await SlamBookQuestion.findById(req.params.id);
  if (!question)
    return res.status(400).send('Invalid Question ID');

  const answered = await SlamBookAnswer.find({questionId : req.params.id});
  if (answered) {
    return res.status(400).send(
        `Cannot delete the question now as it has been answered already by ${
            answered.length} users`,
    );
  }

  await SlamBookAnswer.deleteMany(req.params.id);
  await question.delete();

  return res.status(200).send('Successfully Deleted Question');
};

exports.allAnswers = async (req, res) => {
  debug('function: allAnswers(), Purpose: Route to get all slambook answers');
  const answers = await SlamBookAnswer
                      .find({
                        userId : req.user._id,
                      })
                      .select('-userId -__v')
                      .populate('questionId');
  if (!answers)
    return res.status(404).send('No answers found');
  return res.status(200).send(answers);
};

exports.upsertAnswer = async (req, res) => {
  debug(
      'function: upsertAnswer(), Purpose : Route to upsert a slambook answer');

  const {questionId, answer} = req.body;
  const userAnswer = await SlamBookAnswer.findOneAndUpdate(
      {questionId, userId : req.user._id},
      {answer},
      {new : true, upsert : true},
  );

  return res.status(200).send(userAnswer);
};

exports.deleteAnswer = async (req, res) => {
  debug('function: deleteAnswer(), Purpose: Route to delete an answer');
  const answer = await SlamBookAnswer.findOneAndDelete(req.params.id);
  if (!answer)
    return res.status(404).send('Answer not found');

  return res.status(200).send('Deleted answer');
};
