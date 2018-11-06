const axios = require('axios');
const config = require('../config/config.json');

const axiosOptions = {
  baseURL: config.apiBaseUrl,
  headers: { Authorization: `Bearer ${process.env.MONEEDA_API_KEY}` }
};

const apiRequest = axios.create(axiosOptions);

async function handleAxiosError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status } = error.response;
    throw new Error(`Error during network request: Received ${status}`);
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('Unable to make network request');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error(error);
  }
}

async function getProducts(exchangeId) {
  const response = await apiRequest
    .get(`/exchanges/${exchangeId}/products`)
    .catch(handleAxiosError);
  return response.data;
}

async function getPrice(exchangeId, productId) {
  const response = await apiRequest
    .get(`/exchanges/${exchangeId}/ticker`, {
      params: {
        product: productId
      }
    })
    .catch(handleAxiosError);
  return response.data;
}

exports.getProducts = getProducts;
exports.getPrice = getPrice;
