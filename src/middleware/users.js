const User = require('../models/User');
const ValidationError = require('../errors/ValidationError');

function validateSignupUserData(req, res, next) {
  const { name, password, email } = req.body;
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

module.exports = { validateSignupUserData };
