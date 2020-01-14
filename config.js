const dotenv = require('dotenv');
dotenv.config();
const {
  PORT,
  AMAZON_SCRAPPER_HOST,
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID
} = process.env;
module.exports = {
  PORT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AMAZON_HOST: AMAZON_SCRAPPER_HOST
};
