module.exports = (validator) => (req, res, next) => {
  const { error } = validator(req.body, (isOTP = false));
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  return next();
};
