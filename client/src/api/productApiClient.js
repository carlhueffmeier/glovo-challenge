import axios from 'axios';

const axiosOptions = {
  baseURL: process.env.VUE_APP_BACKEND_URL
};

const apiRequest = axios.create(axiosOptions);

function getAllProducts() {
  return apiRequest.get('/products');
}

function getPricesForProduct(productId) {
  return apiRequest.get(`/products/${productId}/prices`);
}

export default {
  getAllProducts,
  getPricesForProduct
};
