const express = require('express');
const ShopController = require('../../controllers/shop.controller');
const { asyncHandler } = require('../../middlewares/handler');

const router = express.Router();
router.get('', asyncHandler(ShopController.getAll));

module.exports = router;
