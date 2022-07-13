'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.Transaction,{
        foreignKey: 'transaction_id'
      });
      Notification.belongsTo(models.User,{
        foreignKey: 'user_id'
      });
    }
  }
  Notification.init({
    transaction_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    is_read: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};