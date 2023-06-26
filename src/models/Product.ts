'use strict';
import { Optional, Model } from 'sequelize';
import { IModalProduct as ProductAttributes } from '../types';

export interface ProductInput extends Optional<ProductAttributes, 'pId'> {}

export interface ProductOutput extends Required<ProductAttributes> {}
module.exports = (sequelize, DataTypes) => {
  class Product
    extends Model<ProductInput, ProductAttributes>
    implements ProductAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    pId: number;
    catId: number;
    price: number;
    desc: string;
    name: string;
    quantity: number;
    catName: string;
    barId: number;
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'catId',
      });
    }
  }
  Product.init(
    {
      // id: DataTypes.DataTypes.INTEGER,
      pId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'p_id',
      },
      catId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'cat_id',
        references: {
          model: 'Category',
          key: 'catId',
        },
      },
      catName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'cat_name',
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
      barId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'bar_id',
      }
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
