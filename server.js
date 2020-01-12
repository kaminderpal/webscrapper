const express = require('express');
const app = express();
const axios = require('axios');
const config = require('./config');
const { PORT } = config;
const scrapper = require('./src/routes/Amazon/scrapper');

//routes
app.use('/search', scrapper);
app.use('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
