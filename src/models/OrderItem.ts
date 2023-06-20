'use strict';
import { Model, Optional } from 'sequelize';
import { IModalOrderItem as OrderItemAttributes } from '../types';

export interface OrderItemInput
  extends Optional<OrderItemAttributes, 'oItemId'> {}

export interface OrderItemOutput extends OrderItemAttributes {}

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
    oItemId: number;
    oId: number;
    pId: number;
    quantity: number;
    price: number;

    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.OrderDetails, {
        foreignKey: 'oId',
        onDelete: 'CASCADE',
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'pId',
      });
    }
  }
  OrderItem.init(
    {
      // id: DataTypes.INTEGER,
      oItemId: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: 'o_item_id',
      },
      oId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'o_id',
        references: {
          model: 'OrderDetails',
          key: 'oId',
        },
      },
      pId: {
        type: DataTypes.INTEGER,
        field: 'p_id',
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
