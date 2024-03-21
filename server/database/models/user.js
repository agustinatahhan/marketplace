'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: 'userId', as: 'products' });
      User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', 
    timestamps: true, 
    paranoid: true,
  });
  return User;
};
