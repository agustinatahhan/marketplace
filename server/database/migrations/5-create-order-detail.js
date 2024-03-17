'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders', 
          key: 'id'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderDetails');
  }
};
