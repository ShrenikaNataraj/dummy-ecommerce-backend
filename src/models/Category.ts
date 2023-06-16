'use strict';
import { Model, Optional } from 'sequelize';
import { IModalCategory as CategoryModelAttributes } from '../types';

export interface CategoryInput
  extends Optional<CategoryModelAttributes, 'cat_id'> {}

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
    cat_id!: number;
    name: string;
    total: number;

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
      underscored: true,
      timestamps: false,
      modelName: 'Category',
      tableName: 'Category',
      freezeTableName: true,
    }
  );
  return Category;
};
