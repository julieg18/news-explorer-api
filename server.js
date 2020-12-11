const express = require('express');
const app = require('./src/app');

const { PORT = 8080 } = process.env;
const server = express();

server.use('/api', app);

server.listen(PORT);
