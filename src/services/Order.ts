import { OrderDetailsInput, OrderDetailsOutput } from '../models/OrderDetails';
import { OrderItemInput, OrderItemOutput } from '../models/OrderItem';
import db from '../models';
import { IOrderRequest, IOrderRequestEntity } from '../types';
import { getItemByKey } from './Product';

const checkIfProductOutOfStock = async (products: IOrderRequestEntity[]) => {
  for (let product of products) {
    let productItem = await getItemByKey('p_id', product.pId);
    if (productItem[0].quantity < product.quantity)
      throw new Error('Out of Stock');
  }
};

export const createOrder = async (data: IOrderRequest): Promise<any> => {
  const Op = require('sequelize').Op;

  try {
    const { products, email } = data;
    let totalPrice = products.reduce(
      (acc: number, cur) => acc + cur.price * cur.quantity,
      0
    );
    await checkIfProductOutOfStock(products);
    let res = await db.OrderDetails.create({ email, totalPrice });
    await db.OrderItem.bulkCreate(
      data.products.map((item) => {
        return {
          ...item,
          oId: res.dataValues.oId,
        };
      })
    );
    for (let product of products) {
      await db.Product.decrement('quantity', {
        where: {
          p_id: product.pId,
          quantity: {
            [Op.gte]: 0,
          },
        },
        by: product.quantity,
      });
    }
  } catch (e) {
    throw Error(e);
  }
};

export const deleteOrder = async (orderID: number) => {
  try {
    let orderItems = await getOrderDetails(orderID);
    await db.OrderDetails.destroy({ where: { o_id: orderID }, raw: true });
    for (let orderItem of orderItems) {
      await db.Product.increment('quantity', {
        where: {
          p_id: orderItem.pId,
        },
        by: orderItem.quantity,
      });
    }
  } catch (e) {
    throw Error(e);
  }
};

export const getOrderHistory = async (
  email: string
): Promise<OrderDetailsOutput[]> => {
  return await db.OrderDetails.findAll({
    where: { email },
    order: [['updated_at', 'desc']],
    raw: true,
  });
};

export const getOrderDetails = async (
  orderId: number
): Promise<OrderItemOutput[]> => {
  return await db.OrderItem.findAll({ where: { o_id: orderId }, raw: true });
};