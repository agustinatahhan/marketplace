'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'userId', as: 'user', allowNull: true });
      Product.belongsToMany(models.Order, { through: 'OrderDetail', foreignKey: 'productId', as: 'orders' });
    }
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sizes: {
      type: DataTypes.JSON, 
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    paranoid: true,
  });

  return Product;
};
