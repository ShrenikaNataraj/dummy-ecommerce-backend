'use strict';
import { Model } from 'sequelize';
import { IModalCategory as CategoryModel } from '../types';

module.exports = (sequelize, DataTypes) => {
  class Category extends Model implements CategoryModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public cat_id!: number;
    public name: string;
    public total: number;

    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      cat_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      total: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Category',
      freezeTableName: true,
    }
  );
  return Category;
};
