'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.o_id = this.belongsTo(models.OrderDetails, {
        foreignKey: 'o_id',
      });
    }
  }
  OrderItem.init(
    {
      // id: DataTypes.INTEGER,
      o_item_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      o_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'OrderDetails',
          key: 'o_id',
          allowNull: false,
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
      modelName: 'OrderItem',
      tableName: 'OrderItem',
      freezeTableName: true,
    }
  );
  return OrderItem;
};
