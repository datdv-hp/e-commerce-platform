'use strict';

const { TokenModel } = require('../../models/token.model');
const { toObjectId } = require('../../utils/common.util');

class SharedTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    const filter = { userId },
      update = { publicKey, privateKey, refreshToken, refreshTokensUsed: [] },
      options = { upsert: true, new: true, lean: true };
    return TokenModel.findOneAndUpdate(filter, update, options);
  };

  static findByUserId = ({ userId }) => {
    return TokenModel.findOne({ userId }).lean();
  };

  static deleteById = ({ id }) => {
    return TokenModel.deleteOne({ _id: toObjectId(id) }).lean();
  };
  static deleteByUserId = ({ userId }) => {
    return TokenModel.deleteMany({ userId: toObjectId(userId) }).lean();
  };

  static findByRefreshToken = async ({ refreshToken }) => {
    return TokenModel.findOne({ refreshToken }).lean();
  };

  static findByRefreshTokenUsed = async ({ refreshToken }) => {
    return TokenModel.findOne({ refreshTokensUsed: refreshToken }).lean();
  };
}

module.exports = SharedTokenService;
