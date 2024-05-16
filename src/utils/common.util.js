'use strict';
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { HEADER } = require('../constants/common.constant');
const { randomBytes } = require('crypto');
const { isValidObjectId, Types } = require('mongoose');

const SALT_ROUNDS = 10;

const hashPassword = (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const extractApiKey = (req) => {
  return req.headers[HEADER.API_KEY];
};

const extractClientId = (req) => {
  return req.headers[HEADER.X_CLIENT_ID];
};

const generateRandomToken = (length = 64) => {
  return randomBytes(length).toString('hex');
};

const extractAuthorizationToken = (req) => {
  const authorization = req.headers[HEADER.AUTHORIZATION];
  const bearerToken = authorization?.startsWith('Bearer ')
    ? authorization.split(' ')[1]
    : null;
  return bearerToken;
};

const pickInfoData = ({ fields = [], target = {} }) => {
  return _.pick(target, fields);
};

const toObjectId = (id) => {
  if (isValidObjectId(id)) {
    return new Types.ObjectId(id.toString());
  }
  return undefined;
};

const toObjectIds = (ids) => {
  if (Array.isArray(ids)) {
    return ids.map((id) => toObjectId(id)).filter((id) => id);
  }
  return undefined;
};

module.exports = {
  hashPassword,
  comparePassword,
  pickInfoData,
  extractApiKey,
  extractAuthorizationToken,
  extractClientId,
  generateRandomToken,
  toObjectId,
  toObjectIds,
};
