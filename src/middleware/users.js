const User = require('../models/User');
const ValidationError = require('../errors/ValidationError');

function validateSignupUserData(req, res, next) {
  const { name, password = '', email } = req.body;
  const isPasswordValid = /^\S+$/.test(password) && password.length >= 6;

  User.validate({ password, email, name }, ['password', 'email', 'name'])
    .then(() => {
      if (isPasswordValid) {
        next();
      } else {
        throw new ValidationError('User validation failed');
      }
    })
    .catch((err) => {
      next(
        err.name === 'ValidationError'
          ? new ValidationError('User validation failed')
          : err,
      );
    });
}

function checkIfUserEmailIsInUse(req, res, next) {
  const { email } = req.body;
  User.find({ email })
    .then((users) => {
      if (users.length > 0) {
        throw new ValidationError('Email is already in use');
      }
      next();
    })
    .catch(next);
}

module.exports = { validateSignupUserData, checkIfUserEmailIsInUse };
