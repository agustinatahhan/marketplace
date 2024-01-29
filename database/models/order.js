'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Order.belongsToMany(models.Product, { through: 'OrderDetail', foreignKey: 'orderId', as: 'products' });
    }
  }

  Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id',
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE', 
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, 
      },
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders', 
    timestamps: true,
    paranoid: true,
  });

  return Order;
};
