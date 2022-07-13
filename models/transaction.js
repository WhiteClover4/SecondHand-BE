'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User,{
        foreignKey: 'seller_id',
        targetKey: 'id',
        as: 'seller'
      });
      Transaction.belongsTo(models.User,{
        foreignKey: 'buyer_id',
        targetKey: 'id',
        as: 'buyer'
      });
      Transaction.belongsTo(models.Product,{
        foreignKey: 'product_id'
      });
      Transaction.hasMany(models.Notification, {
        foreignKey: 'transaction_id'
      });
    }
  }
  Transaction.init({
    seller_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    offer_price: DataTypes.INTEGER,
    status: DataTypes.ENUM({
        values: ['OFFERED', 'REJECTED', 'ACCEPTED']
      }),
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};