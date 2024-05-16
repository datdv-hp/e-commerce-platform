const { model, Schema } = require('mongoose'); // Erase if already required
const { CollectionName } = require('../constants/common.constant');

const DOCUMENT_NAME = 'ApiKey';

const Permissions = {
  STANDARD: '0000',
  PRO: '1111',
  PREMIUM: '2222',
};

// Declare the Schema of the Mongo model
var apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: Object.values(Permissions),
    },
  },
  {
    timestamps: true,
    collection: CollectionName.API_KEYS,
  }
);

const ApiKeyModel = model(DOCUMENT_NAME, apiKeySchema);
//Export the model
module.exports = { ApiKeyModel, Permissions };
