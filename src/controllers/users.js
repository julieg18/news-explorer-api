const bcrypt = require('bcryptjs');
const User = require('../models/User');

function signupUser(req, res, next) {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch(next);
}

module.exports = { signupUser };
