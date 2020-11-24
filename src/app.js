const express = require('express');
const bodyParser = require('body-parser');

const app = express.Router();

app.use(bodyParser.json());

app.use('/', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

module.exports = app;
