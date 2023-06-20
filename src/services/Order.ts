import { OrderDetailsInput, OrderDetailsOutput } from '../models/OrderDetails';
import { OrderItemInput, OrderItemOutput } from '../models/OrderItem';
import db from '../models';
import { IModalProduct, IOrderRequest } from '../types';

export const createOrder = async (data: IOrderRequest): Promise<any> => {
  try {
    const { products, email } = data;
    let totalPrice = products.reduce(
      (acc: number, cur) => acc + cur.price * cur.quantity,
      0
    );
    let res = await db.OrderDetails.create({ email, totalPrice });
    await db.OrderItem.bulkCreate(
      data.products.map((item) => {
        return {
          ...item,
          oId: res.dataValues.oId,
        };
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export const deleteOrder = async (orderID: number) => {
  return await db.OrderDetails.destroy({ where: { o_id: orderID }, raw: true });
};

export const getOrderHistory = async (
  email: string
): Promise<OrderDetailsOutput[]> => {
  return await db.OrderDetails.finAdAll({ where: { email: email }, raw: true });
};

export const getOrderDetails = async (
  orderId: number
): Promise<OrderItemOutput[]> => {
  return await db.OrderItem.findAll({ where: { o_id: orderId }, raw: true });
};