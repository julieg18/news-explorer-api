const express = require('express');
const app = require('./src/app');

const { PORT = 3000 } = process.env;
const server = express();

server.use('/api', app);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
