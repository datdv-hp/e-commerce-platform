const { ApiKeyModel } = require('../models/apiKey.model');
class ApiKeyService {
  static findByKey = (key, select) => {
    return ApiKeyModel.findOne({ key, status: true }, select).lean();
  };
  static existsByKey = async (key) => {
    return ApiKeyModel.exists({ key, status: true }).lean();
  };
}

module.exports = ApiKeyService;
