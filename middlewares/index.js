require('dotenv').config();
const jwt = require('jsonwebtoken');
const winston = require('winston');
const mongoose = require('mongoose');

class Middleware {
  static async userAuth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied! No token Provided');

    try {
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      req.user = decoded;
    } catch (ex) {
      return res.status(400).send('Invalid Token');
    }
    return next();
  }

  static async adminAuth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).send('Access denied, No token Provided!');
    }
    try {
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      if (decoded.isAdmin === undefined || !decoded.isAdmin) {
        return res.status(403).send('Access Denied');
      }
      req.admin = decoded;
    } catch (ex) {
      return res.status(400).send('Invalid Token');
    }
    return next();
  }

  static async error(err, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send('Internal Server Error, Please try again later!');
    return next();
  }

  static async validateObjectId(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send('Invalid ObjectId Format!');
    }
    return next();
  }

  static async validatorHelper(validator) {
    return (req, res, next) => {
      const { error } = validator(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      return next();
    };
  }
}

module.exports = Middleware;
