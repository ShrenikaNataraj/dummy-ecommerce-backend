'use strict';

const { Model } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Category', {
      cat_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      total: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });

    await queryInterface.createTable('Product', {
      p_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cat_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Category',
          key: 'cat_id',
          allowNull: false,
        },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable('OrderDetails', {
      o_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('OrderItem', {
      o_item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      o_id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'OrderDetails',
          key: 'o_id',
          allowNull: false,
        },
      },
      p_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Product',
          key: 'p_id',
          allowNull: false,
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    // we can do this because it is the first migration
    await queryInterface.dropAllTables();
  },
};
