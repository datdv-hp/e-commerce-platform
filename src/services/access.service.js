'use strict';

const { ShopModel, ShopRole } = require('../models/shop.model');
const {
  hashPassword,
  pickInfoData,
  generateRandomToken,
  comparePassword,
} = require('../utils/common.util');
const SharedTokenService = require('./shared/token.shared-service');
const { createTokenPair } = require('../utils/auth.utils');
const {
  BadRequestError,
  ErrorResponse,
  UnauthorizedError,
  ForbiddenError,
} = require('../core/error.response');
const SharedShopService = require('./shared/shop.shared-service');

class AccessService {
  static logout = async ({ keyToken }) => {
    const deletedKeyToken = await SharedTokenService.deleteById({
      id: keyToken._id,
    });
    return deletedKeyToken;
  };

  static refreshToken = async ({ refreshToken }) => {
    SharedTokenService.findByRefreshTokenUsed({ refreshToken }).then(
      (tokenByRefreshTokenUsed) => {
        if (tokenByRefreshTokenUsed) {
          SharedTokenService.deleteByUserId({
            userId: tokenByRefreshTokenUsed.userId,
          });
          throw new ForbiddenError('Invalid token');
        }
      }
    );

    const tokenByRefreshToken = await SharedTokenService.findByRefreshToken({
      refreshToken,
    });
    if (!tokenByRefreshToken) {
      throw new ForbiddenError('Invalid token');
    }

    const shop = await SharedShopService.findById({
      id: tokenByRefreshToken.userId,
    });
    if (!shop) {
      throw new UnauthorizedError('Invalid token');
    }
    const tokens = await this.generateAuthTokens({
      userId: shop._id,
      email: shop.email,
    });
    return {
      shop: pickInfoData({
        fields: ['_id', 'name', 'email'],
        target: shop,
      }),
      tokens,
    };
  };

  static login = async ({ email, password }) => {
    const shop = await SharedShopService.findByEmail({ email });
    if (!shop) {
      throw new BadRequestError('Shop not registered');
    }
    const matchedCredential = await comparePassword(password, shop.password);
    if (!matchedCredential) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const tokens = await this.generateAuthTokens({
      userId: shop._id,
      email,
    });
    return {
      shop: pickInfoData({
        fields: ['_id', 'name', 'email'],
        target: shop,
      }),
      tokens,
    };
  };

  static signup = async ({ name, email, password }) => {
    const shopHolder = await SharedShopService.existsByEmail({ email });
    if (shopHolder) {
      throw new BadRequestError('Email already exists');
    }
    const newShop = await SharedShopService.create({
      name,
      email,
      password: await hashPassword(password),
      roles: [ShopRole.SHOP],
    });
    if (!newShop) {
      throw new ErrorResponse('Cannot create shop');
    }
    const tokens = await this.generateAuthTokens({
      userId: newShop._id,
      email,
    });

    return {
      shop: pickInfoData({
        fields: ['_id', 'name', 'email'],
        target: newShop,
      }),
      tokens,
    };
  };

  static async generateAuthTokens({ userId, email }) {
    const privateKey = generateRandomToken();
    const publicKey = generateRandomToken();

    const tokens = createTokenPair({
      payload: { userId, email },
      publicKey,
      privateKey,
    });

    await SharedTokenService.createKeyToken({
      userId,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
    });
    return tokens;
  }
}
module.exports = AccessService;
