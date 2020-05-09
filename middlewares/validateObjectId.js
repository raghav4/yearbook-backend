const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('400: Invalid Object ID');
  }

  return next();
};
