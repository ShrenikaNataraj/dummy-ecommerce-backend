import { OrderDetailsInput, OrderDetailsOutput } from '../models/OrderDetails';
import { OrderItemInput } from '../models/OrderItem';
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
