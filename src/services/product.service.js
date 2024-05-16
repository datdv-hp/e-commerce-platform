'use strict';

const { BadRequestError } = require('../core/error.response');
const {
  ProductModel,
  ProductType,
  ElectronicModel,
  ClothingModel,
} = require('../models/product.model');

class ProductFactory {
  static async createProduct(type, payload) {
    switch (type) {
      case ProductType.CLOTHING:
        return new Clothing(payload).createProduct();
      case ProductType.ELECTRONICS:
        return new Electronic(payload).createProduct();
      default:
        throw new BadRequestError(`Invalid product type: ${type}`);
    }
  }
}

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  createProduct(product_id) {
    return ProductModel.create({ ...this, _id: product_id });
  }
}

// Define sub-class for different product types
class Clothing extends Product {
  async createProduct() {
    const newClothing = await ClothingModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newClothing) throw new BadRequestError('Failed to create clothing');

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestError('Failed to create product');

    return newProduct;
  }
}

class Electronic extends Product {
  async createProduct() {
    const newElectronic = await ElectronicModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic)
      throw new BadRequestError('Failed to create electronic');

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError('Failed to create product');

    return newProduct;
  }
}

module.exports = { ProductFactory };
