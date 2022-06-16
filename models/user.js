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
      User.belongsTo(models.Role, {
        foreignKey: 'role_id'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    otp: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
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