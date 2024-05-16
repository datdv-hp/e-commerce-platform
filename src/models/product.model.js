const { model, Schema, SchemaTypes } = require('mongoose'); // Erase if already required
const { CollectionName } = require('../constants/common.constant');
const { ShopModel } = require('./shop.model');

const PRODUCT_DOCUMENT_NAME = 'Product';
const CLOTHING_DOCUMENT_NAME = 'Clothing';
const ELECTRONIC_DOCUMENT_NAME = 'Electronic';
const FURNITURE_DOCUMENT_NAME = 'Furniture';
const ProductType = {
  ELECTRONICS: 'electronics',
  CLOTHING: 'clothing',
  FURNITURE: 'furniture',
};

// Declare the Schema of the Mongo model
const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: {
      type: String,
      enum: Object.values(ProductType),
      required: true,
    },
    product_shop: { type: SchemaTypes.ObjectId, ref: ShopModel },
    product_attributes: { type: SchemaTypes.Mixed, required: true },
  },
  {
    timestamps: true,
    collection: CollectionName.PRODUCTS,
  }
);

const ProductModel = model(PRODUCT_DOCUMENT_NAME, productSchema);

const clothingSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String },
    material: { type: String },
    product_shop: { type: SchemaTypes.ObjectId, ref: ShopModel },
  },
  { timestamps: true, collection: CollectionName.CLOTHINGS }
);
const ClothingModel = model(CLOTHING_DOCUMENT_NAME, clothingSchema);

const electronicSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: { type: String },
    color: { type: String },
    product_shop: { type: SchemaTypes.ObjectId, ref: ShopModel },
  },
  { timestamps: true, collection: CollectionName.ELECTRONICS }
);
const ElectronicModel = model(ELECTRONIC_DOCUMENT_NAME, electronicSchema);

const furnitureSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String },
    material: { type: String },
    product_shop: { type: SchemaTypes.ObjectId, ref: ShopModel },
  },
  { timestamps: true, collection: CollectionName.FURNITURE }
);
const FurnitureModel = model(FURNITURE_DOCUMENT_NAME, furnitureSchema);

//Export the model
module.exports = { ProductModel, ClothingModel, ElectronicModel, ProductType };
