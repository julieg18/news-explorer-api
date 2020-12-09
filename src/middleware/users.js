const User = require('../models/User');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const {
  errMessages: { userValidationFailed, userEmailAlreadyInUse },
} = require('../utils/constants');

function validateSignupUserData(req, res, next) {
  const { name, password = '', email } = req.body;
  const isPasswordValid = /^\S+$/.test(password) && password.length >= 6;

  User.validate({ password, email, name }, ['password', 'email', 'name'])
    .then(() => {
      if (isPasswordValid) {
        next();
      } else {
        throw new ValidationError(userValidationFailed);
      }
    })
    .catch((err) => {
      next(
        err.name === 'ValidationError'
          ? new ValidationError(userValidationFailed)
          : err,
      );
    });
}

function checkIfUserEmailIsInUse(req, res, next) {
  const { email } = req.body;
  User.find({ email })
    .then((users) => {
      if (users.length > 0) {
        throw new ConflictError(userEmailAlreadyInUse);
      }
      next();
    })
    .catch(next);
}

module.exports = { validateSignupUserData, checkIfUserEmailIsInUse };
