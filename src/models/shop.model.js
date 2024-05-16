const { Schema, SchemaTypes, model } = require('mongoose'); // Erase if already required
const {
  CollectionName,
  TEXT_MAX_LENGTH,
} = require('../constants/common.constant');

const DOCUMENT_NAME = 'Shop';
const ShopStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

const ShopRole = {
  SHOP: 'shop',
  WRITER: 'writer',
  EDITOR: 'editor',
  ADMIN: 'admin',
};

// Declare the Schema of the Mongo model
const shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: TEXT_MAX_LENGTH,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ShopStatus),
      default: ShopStatus.INACTIVE,
    },
    verify: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: CollectionName.SHOPS,
  }
);

//Export the model
const ShopModel = model(DOCUMENT_NAME, shopSchema);
module.exports = {
  ShopModel,
  ShopStatus,
  ShopRole,
};
