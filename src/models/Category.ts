'use strict';
import { Model, Optional } from 'sequelize';
import { IModalCategory as CategoryModelAttributes } from '../types';

export interface CategoryInput extends Optional<CategoryModelAttributes, 'catId'> {}

export interface CategoryOutput extends Required<CategoryModelAttributes> {}

module.exports = (sequelize, DataTypes) => {
  class Category
    extends Model<CategoryModelAttributes, CategoryInput>
    implements CategoryModelAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    catId!: number;
    name: string;
    total: number;

    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      catId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'cat_id',
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
      underscored: true,
      timestamps: false,
      modelName: 'Category',
      tableName: 'Category',
      freezeTableName: true,
    }
  );
  return Category;
};
