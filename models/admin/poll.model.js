const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Poll',
    new mongoose.Schema({
      title : {
        type : String,
        required : true,
      },
    }),
);
