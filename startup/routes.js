const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const {error} = require('../middlewares');
const routes = require('../routes');

module.exports = (app) => {
  app.use(
      cors({
        exposedHeaders : [ 'Content-Length', 'x-auth-token' ],
      }),
  );
  app.use(express.json());
  app.use(express.urlencoded({extended : true}));
  app.use(fileUpload());
  app.use('/api', routes);
  app.use(error);
};
