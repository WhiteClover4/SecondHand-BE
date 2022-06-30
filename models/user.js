'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, {
        foreignKey: 'seller_id'
      });
      User.hasMany(models.Transaction, {
        foreignKey: 'buyer_id',
        
      });
      User.hasMany(models.Notification, {
        foreignKey: 'user_id'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    otp: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    profile_picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, +process.env.SALT_ROUNDS);
        return user;
      }
    }
  });
  return User;
};