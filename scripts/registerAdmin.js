/* eslint-disable no-console */
require('dotenv').config({ path: '../.env' });
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const readline = require('readline');
const { Admin } = require('../models');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printError = '\x1b[31m%s\x1b[0m';
const printSuccess = '\x1b[32m%s\x1b[0m';

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
  },
);

const createSuperAdmin = () => {
  rl.question('Please enter the username: ', async (username) => {
    let admin = await Admin.findOne({ username });
    if (admin) {
      console.log(
        printError,
        'Username not available, Please try again with a different one!',
      );
      return rl.close(process.exit(0));
    }
    rl.question('Please enter a password: ', async (password) => {
      admin = await new Admin({
        username,
        password,
      });
      try {
        const salt = await bcrypt.genSalt(15);
        admin.password = await bcrypt.hash(admin.password, salt);
        await admin.save();
        console.log(printSuccess, 'Successfully registered admin 🎊:', username);
        return rl.close(process.exit(1));
      } catch (ex) {
        return console.log(printError, ex.message);
      }
    });
  });
};

createSuperAdmin();
