'use strict';
import { Model, Optional } from 'sequelize';
import { IModalOrderDetails as OrderDetailsAttributes } from '../types';

//TODO:to use UUID for id
export interface OrderDetailsInput
  extends Optional<OrderDetailsAttributes, 'oId'> {}

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
    oId!: number;
    email: string;
    totalPrice: number;

    static associate(models) {
      OrderDetails.hasMany(models.OrderItem, {
        foreignKey: 'oId',
      })
        
      // define association here
    }
  }
  OrderDetails.init(
    {
      oId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        field: 'total_price',
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
