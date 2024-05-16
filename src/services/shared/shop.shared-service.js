const {
  shopWithCredentialAttributes,
} = require('../../constants/shop.constant');
const { ShopModel } = require('../../models/shop.model');

class SharedShopService {
  static findByEmail({ email }, select = shopWithCredentialAttributes) {
    return ShopModel.findOne({ email }).select(select).lean();
  }

  static existsByEmail({ email }) {
    return ShopModel.exists({ email }).lean();
  }

  static create({ name, email, password, roles, status }) {
    return ShopModel.create({ name, email, password, roles, status });
  }
}

module.exports = SharedShopService;
