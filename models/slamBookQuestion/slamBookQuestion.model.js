const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Question',
    new mongoose.Schema({
      title : {
        type : String,
        required : true,
      },
    }),
);
