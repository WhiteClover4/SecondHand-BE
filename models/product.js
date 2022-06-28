'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
      Product.hasMany(models.ProductImage, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Transaction, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Notification, {
        foreignKey: 'product_id'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    status: DataTypes.ENUM({
      values: ['DRAFT', 'REJECTED', 'ACCEPTED', 'COMPLETED']
    }),
    category_id: DataTypes.INTEGER,
    isPublished: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};