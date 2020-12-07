const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const ValidationError = require('../errors/ValidationError');
const {
  errMessages: { incorrectEmailOrPassword },
} = require('../utils/constants');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(val) {
        return isEmail(val);
      },
      message: 'invalid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function findUserByCredentials({ email, password }) {
  let foundUser;
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new ValidationError(incorrectEmailOrPassword);
      }
      foundUser = user;
      return bcrypt.compare(password, foundUser.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new ValidationError(incorrectEmailOrPassword);
      }
      return foundUser;
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = model('User', userSchema);
