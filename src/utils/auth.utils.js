'use strict';
const JWT = require('jsonwebtoken');
const ApiKeyService = require('../services/apiKey.service');
const {
  extractApiKey,
  extractClientId,
  extractAuthorizationToken,
} = require('./common.util');
const { ForbiddenError, UnauthorizedError } = require('../core/error.response');
const SharedTokenService = require('../services/shared/token.shared-service');

const createTokenPair = ({ payload, privateKey, publicKey }) => {
  const accessToken = JWT.sign(payload, publicKey, {
    expiresIn: '2 days', // 1 minutes
  });
  const refreshToken = JWT.sign(payload, privateKey, {
    expiresIn: '30 days',
  });

  return { accessToken, refreshToken };
};

const RequiredApiKey = async (req, _, next) => {
  try {
    const key = extractApiKey(req);
    if (key) {
      const apiObjKey = await ApiKeyService.findByKey(key, [
        '_id',
        'permissions',
      ]);
      if (apiObjKey) {
        req.objKey = apiObjKey;
        return next();
      }
    }
    throw new ForbiddenError();
  } catch (error) {
    next(error);
  }
};

const RequiredPermission = ({ permission }) => {
  return (req, _, next) => {
    const { permissions } = req.objKey || {};
    if (permission && !permissions.includes(permission)) {
      throw new ForbiddenError();
    }
    return next();
  };
};

const RequiredAuth = async (req, _, next) => {
  try {
    const userId = extractClientId(req);
    if (!userId) throw new UnauthorizedError('Invalid x-client-id');

    const accessToken = extractAuthorizationToken(req);
    if (!accessToken) throw new UnauthorizedError();

    const keyToken = await SharedTokenService.findByUserId({ userId });
    if (!keyToken) throw new UnauthorizedError('Invalid x-client-id');

    const decodedUser = JWT.verify(accessToken, keyToken.publicKey, {
      ignoreExpiration: false,
    });
    if (decodedUser?.userId !== userId) throw new UnauthorizedError();
    req.keyToken = keyToken;
    req.user = decodedUser;
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTokenPair,
  RequiredApiKey,
  RequiredPermission,
  RequiredAuth,
};
