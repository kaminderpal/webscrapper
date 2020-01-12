const cheerio = require('cheerio');
const uuid = require('uuid/v4');
const config = require('../../../config');
const { AMAZON_HOST } = config;

const getScrapData = data => {
  const $ = cheerio.load(data, {
    normalizeWhitespace: true,
    xmlMode: true
  });
  const arr = [];

  $('span[data-component-type=s-search-results]')
    .find('span[cel_widget_id=SEARCH_RESULTS-SEARCH_RESULTS]')
    .each((i, elem) => {
      const imgSrc = $(elem)
        .find('img')
        .attr('src');
      const url = $(elem)
        .find('span[data-component-type=s-product-image]')
        .find('a')
        .attr('href');
      const title = $(elem)
        .find('.a-size-base-plus')
        .text();
      const price = $(elem)
        .find('.a-price')
        .find('.a-offscreen')
        .text();
      const rating = $(elem)
        .find('span.a-icon-alt')
        .text();

      arr.push({
        id: uuid().toString(),
        title,
        price,
        rating,
        imgSrc,
        url: `${AMAZON_HOST}${url}`
      });
    });
  return arr;
};
module.exports = { getScrapData };
