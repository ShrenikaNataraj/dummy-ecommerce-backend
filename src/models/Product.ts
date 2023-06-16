'use strict';
import { Model } from 'sequelize';
import { IModalProduct as ProductModal } from '../types';
module.exports = (sequelize, DataTypes) => {
  class Product extends Model<ProductModal> implements ProductModal {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    p_id: number;
    cat_id: number;
    name: string;
    price: string;
    quantity: number;
    desc: string;
    static cat_id: any;
    
    static associate(models) {
      // define association here
      this.cat_id = this.belongsTo(models.Category, {
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
      modelName: 'Product',
      tableName: 'Product',
      freezeTableName: true,
    }
  );
  return Product;
};
