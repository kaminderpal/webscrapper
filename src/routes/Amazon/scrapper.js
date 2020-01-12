const Helper = require('./helper');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const config = require('../../../config');
const router = express.Router();
const { getScrapData } = Helper;
const { AMAZON_HOST } = config;

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
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
