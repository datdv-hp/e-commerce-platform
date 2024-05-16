const {
  ORDER_DIRECTION,
  DEFAULT_ORDER_BY,
  DEFAULT_LIMIT,
  DEFAULT_FIRST_PAGE,
} = require('../constants/common.constant');
const { shopAttributes } = require('../constants/shop.constant');
const { ShopModel } = require('../models/shop.model');

class ShopService {
  static findAll = async (
    {
      page = DEFAULT_FIRST_PAGE,
      limit = DEFAULT_LIMIT,
      orderBy = DEFAULT_ORDER_BY,
      orderDirection = ORDER_DIRECTION.ASC,
      keyword,
    },
    select = shopAttributes
  ) => {
    const skip = limit * (page - 1);
    const filter = {};
    if (keyword) {
      filter.$or = [
        { name: { $regex: `*.${keyword}.*`, $options: 'i' } },
        { email: { $regex: `*.${keyword}.*`, $options: 'i' } },
      ];
    }
    const [items, totalItems] = await Promise.all([
      ShopModel.find(filter, select)
        .sort({ [orderBy]: orderDirection === ORDER_DIRECTION.ASC ? 1 : -1 })
        .skip(skip)
        .lean(),
      ShopModel.countDocuments(filter),
    ]);
    return { items, totalItems };
  };
}
module.exports = ShopService;
