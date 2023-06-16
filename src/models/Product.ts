'use strict';
import { Optional, Model } from 'sequelize';
import { IModalProduct as ProductAttributes } from '../types';

export interface ProductInput extends Optional<ProductAttributes, 'p_id'> {}

export interface ProductOutput extends Required<ProductAttributes> {}
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'cat_id',
      });
    }
  }
  Product.init(
    {
      // id: DataTypes.DataTypes.INTEGER,
      p_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cat_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'cat_id',
        },
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Product',
      tableName: 'Product',
      freezeTableName: true,
    }
  );
  return Product;
};
