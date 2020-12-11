const express = require('express');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const {
  validateSignupUserData,
  checkIfUserEmailIsInUse,
} = require('../middleware/users');
const { signupUser, loginUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const {
  errMessages: { resourceNotFound },
} = require('../utils/constants');

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
routesRouter.use('/', (req, res, next) => {
  next(new NotFoundError(resourceNotFound));
});

module.exports = routesRouter;
