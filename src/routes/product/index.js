const express = require('express');
const ProductController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../middlewares/handler');

const router = express.Router();
router.post('', asyncHandler(ProductController.createProduct));

module.exports = router;
