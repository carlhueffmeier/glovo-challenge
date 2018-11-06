const moneedaApi = require('../api/moneeda');
const config = require('../config/config.json');
const { intersectOn, zipObject } = require('../lib/utils');

async function getAll(req, res) {
  const requests = config.exchanges.map(moneedaApi.getProducts);
  const productsOfAllExchanges = await Promise.all(requests);
  const sharedProducts = intersectOn('id', productsOfAllExchanges);
  res.json(sharedProducts);
}

async function getByProduct(req, res) {
  const { productId } = req.params;
  const requests = config.exchanges.map(exchangeId => moneedaApi.getPrice(exchangeId, productId));
  const pricesInAllExchanges = await Promise.all(requests);
  const pricesByExchange = zipObject(config.exchanges, pricesInAllExchanges);
  res.json(pricesByExchange);
}

exports.getAll = getAll;
exports.getByProduct = getByProduct;
