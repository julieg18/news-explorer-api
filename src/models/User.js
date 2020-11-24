const mongoose = require('mongoose');
const { isEmail } = require('validator');

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

module.exports = model('User', userSchema);
