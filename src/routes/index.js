const express = require('express');
const usersRouter = require('./users');
const articlesRouter = require('./articles');

const routesRouter = express.Router();

routesRouter.use('/users', usersRouter);
routesRouter.use('/articles', articlesRouter);

module.exports = routesRouter;
