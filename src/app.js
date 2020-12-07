const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const routesRouter = require('./routes');
const rateLimiterUsingThirdParty = require('./middleware/rateLimiter');
const { requestLogger, errorLogger } = require('./middleware/logger');

dotenv.config();

mongoose.connect(process.env.DB || 'mongodb://localhost:27017/news-explorer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express.Router();

app.use(helmet());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(rateLimiterUsingThirdParty);

app.use('/', routesRouter);

app.use(errorLogger);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occured on the app' : message,
  });
});
module.exports = app;
