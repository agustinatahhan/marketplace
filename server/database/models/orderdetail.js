'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
      OrderDetail.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }
  OrderDetail.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
      min: 1, 
      },
    },
  }, {
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'order_details', 
    timestamps: true,
    paranoid: true,
  });

  return OrderDetail;
};
