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
  } catch (e) {
    throw e;
  }
};
