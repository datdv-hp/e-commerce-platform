'use strict';

const { SuccessResponse } = require('../core/success.response');
const { ProductFactory } = require('../services/product.service');

class ProductController {
  createProduct = async (req, res, next) => {
    const newProduct = await ProductFactory.createProduct(
      req.body.product_type,
      { ...req.body, product_shop: req.user?.userId }
    );
    return new SuccessResponse(newProduct);
  };
}

module.exports = new ProductController();
