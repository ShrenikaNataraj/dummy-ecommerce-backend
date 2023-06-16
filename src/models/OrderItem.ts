'use strict';
import { Model, Optional } from 'sequelize';
import { IModalOrderItem as OrderItemAttributes } from '../types';

export interface OrderItemInput extends Optional<OrderItemAttributes, 'o_id'> {}

export interface OrderItemOutput extends Required<OrderItemAttributes> {}
module.exports = (sequelize, DataTypes) => {
  class OrderItem
    extends Model<OrderItemInput, OrderItemAttributes>
    implements OrderItemAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
     */
    o_item_id: number;
    p_id: number;
    quantity: number;
    o_id: number;
    price: number;
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.OrderDetails, {
        foreignKey: 'o_id',
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'p_id',
      });
    }
  }
  OrderItem.init(
    {
      // id: DataTypes.INTEGER,
      o_item_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      o_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'OrderDetails',
          key: 'o_id',
        },
      },
      p_id: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'OrderItem',
      tableName: 'OrderItem',
      freezeTableName: true,
    }
  );
  return OrderItem;
};
