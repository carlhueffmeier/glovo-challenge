const express = require('express');
const router = express.Router();
const productController = require('./controllers/product');
const { catchErrors } = require('./handlers/errorHandlers');

// Get all shared products between all exchanges listed in config/config.json
router.get('/products', catchErrors(productController.getAll));

// Find product with productId and get prices at all configured exchanges
router.get('/products/:productId/prices', catchErrors(productController.getByProduct));

module.exports = router;
