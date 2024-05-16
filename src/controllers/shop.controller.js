'use strict';

const { SuccessResponse } = require('../core/success.response');
const ShopService = require('../services/shop.service');

class ShopController {
  static getAll = async (req, res, next) => {
    const shop = await ShopService.findAll(req.query);
    return new SuccessResponse(shop);
  };
}

module.exports = ShopController;
