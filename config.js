const dotenv = require('dotenv');
dotenv.config();

const configs = {
  PORT: process.env.PORT,
  AMAZON_HOST: process.env.AMAZON_SCRAPPER_HOST
};
module.exports = configs;
