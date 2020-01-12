const express = require('express');
const app = express();
const axios = require('axios');
const config = require('./config');
const { PORT } = config;

app.use('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
