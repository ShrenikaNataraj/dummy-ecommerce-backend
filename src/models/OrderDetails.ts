'use strict';
import { Model, Optional } from 'sequelize';
import { IModalOrderDetails as OrderDetailsAttributes } from '../types';

//TODO:to use UUID for id
export interface OrderDetailsInput
  extends Optional<OrderDetailsAttributes, 'o_id'> {}

export interface OrderDetailsOutput extends Required<OrderDetailsAttributes> {}

module.exports = (sequelize, DataTypes) => {
  class OrderDetails
    extends Model<OrderDetailsAttributes, OrderDetailsInput>
    implements OrderDetailsAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    o_id!: number;
    created_at: Date;
    updated_at: Date;
    email: string;
    total_price: number;

    static associate(models) {
      // define association here
    }
  }
  OrderDetails.init(
    {
      o_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_at: {
        allowNull: false,
        field: 'updated_at',
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'OrderDetails',
      tableName: 'OrderDetails',
      freezeTableName: true,
    }
  );
  return OrderDetails;
};
