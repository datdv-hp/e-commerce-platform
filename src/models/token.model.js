const { Schema, model, SchemaTypes } = require('mongoose'); // Erase if already required
const { CollectionName } = require('../constants/common.constant');
const { ShopModel } = require('./shop.model');

const DOCUMENT_NAME = 'Token';

// Declare the Schema of the Mongo model
var TokenSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: ShopModel.name,
    },
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true },
    refreshTokensUsed: { type: Array, default: [] },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: CollectionName.tokens,
  }
);

const TokenModel = model(DOCUMENT_NAME, TokenSchema);
//Export the model
module.exports = { TokenModel };
