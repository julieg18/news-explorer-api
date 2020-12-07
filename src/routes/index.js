const express = require('express');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const {
  validateSignupUserData,
  checkIfUserEmailIsInUse,
} = require('../middleware/users');
const { signupUser, loginUser } = require('../controllers/users');

const routesRouter = express.Router();
routesRouter.post(
  '/signup',
  validateSignupUserData,
  checkIfUserEmailIsInUse,
  signupUser,
);
routesRouter.post('/signin', loginUser);
routesRouter.use('/users', usersRouter);
routesRouter.use('/articles', articlesRouter);

module.exports = routesRouter;
