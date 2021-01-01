const express = require('express');
const path = require('path');
const app = require('./src/app');

const { PORT = 8080 } = process.env;
const server = express();

server.use('/api', app);
server.use(express.static(path.join(__dirname, 'build')));

server.listen(PORT);
