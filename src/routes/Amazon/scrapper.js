const Helper = require('./helper');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const config = require('../../../config');
const router = express.Router();
const { getScrapData } = Helper;
const { AMAZON_HOST } = config;
const logger = require('../../../logs/init');
router.get('/', async (req, res) => {
  const {
    query: { q = '', page = 1 }
  } = req;
  const url = `${AMAZON_HOST}/s?k=${q.replace(
    /\s/g,
    '+'
  )}&ref=nb_sb_noss_2&page=${page}`;
  try {
    const response = await axios.get(url);
    const data = getScrapData(response.data);
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(400).send({ message: 'Bad Request' });
  }
});
module.exports = router;
