const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/news-explorer-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express.Router();

app.use(bodyParser.json());

app.use('/', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

module.exports = app;
