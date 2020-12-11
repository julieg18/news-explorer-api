const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const routesRouter = require('./routes');
const rateLimiterUsingThirdParty = require('./middleware/rateLimiter');
const { requestLogger, errorLogger } = require('./middleware/logger');
const handleError = require('./controllers/error');

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
app.use(handleError);
module.exports = app;
