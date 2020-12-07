const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signupUser(req, res, next) {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.status(201).send({ user: newUser });
    })
    .catch(next);
}

function loginUser(req, res, next) {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { userId: user._id },
        process.env.NODE_ENV === 'production'
          ? process.env.JWT_KEY
          : 'secret-key',
        {
          expiresIn: '7d',
        },
      );
      res.send({ message: 'Login successful', token });
    })
    .catch(next);
}

function getLoggedInUser(req, res, next) {
  const { userId } = req.user;
  User.findById(userId)
    .then(({ email, name }) => {
      res.send({ message: 'User found', user: { email, name } });
    })
    .catch(next);
}

module.exports = { signupUser, loginUser, getLoggedInUser };
