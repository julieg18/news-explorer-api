const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/news-explorer-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express.Router();

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occured on the app' : message,
  });
});
module.exports = app;
