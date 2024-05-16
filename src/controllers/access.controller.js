'use strict';

const { SuccessResponse } = require('../core/success.response');
const AccessService = require('../services/access.service');

class AccessController {
  static signup = async (req, res, next) => {
    const shop = await AccessService.signup(req.body);
    return new SuccessResponse(shop);
  };
  static login = async (req, res, next) => {
    const shop = await AccessService.login(req.body);
    return new SuccessResponse(shop);
  };
  static logout = async (req, res, next) => {
    const shop = await AccessService.logout({ keyToken: req.keyToken });
    return new SuccessResponse(shop);
  };
  static refreshToken = async (req, res, next) => {
    const shop = await AccessService.refreshToken({
      refreshToken: req.body.refreshToken,
    });
    return new SuccessResponse(shop);
  };
}

module.exports = AccessController;
