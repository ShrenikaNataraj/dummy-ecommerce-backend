import { OrderDetailsOutput } from '../models/OrderDetails';
import { OrderItemOutput } from '../models/OrderItem';
import db from '../models';
import { IOrderRequest, IOrderRequestEntity, StatusCodes } from '../types';
import { getItemByKey } from './Product';
import { HttpError } from '../routes/helper/helper';

const checkIfProductOutOfStock = async (products: IOrderRequestEntity[]) => {
  for (let product of products) {
    let productItem = await getItemByKey('p_id', product.pId);
    if (productItem[0].quantity < product.quantity)
      throw new HttpError('Out Of Stock', StatusCodes.USER_ERROR);
  }
};

export const createOrder = async (data: IOrderRequest): Promise<number> => {
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
    return res.dataValues.oId;
  } catch (e) {
    if (e instanceof HttpError) throw e;
    else {
      throw new HttpError('Something went Wrong', StatusCodes.SERVER_ERROR);
    }
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
    throw new HttpError('Something went Wrong', StatusCodes.SERVER_ERROR);
  }
};

export const getOrderHistory = async (
  email: string
): Promise<OrderDetailsOutput[]> => {
  try {
    return await db.OrderDetails.findAll({
      where: { email },
      order: [['updated_at', 'desc']],
      raw: true,
    });
  } catch (e) {
    throw new HttpError('Something went Wrong', StatusCodes.SERVER_ERROR);
  }
};

export const getOrderDetails = async (
  orderId: number
): Promise<OrderItemOutput[]> => {
  try {
    return await db.OrderItem.findAll({ where: { o_id: orderId }, raw: true });
  } catch (e) {
    throw new HttpError('Something went Wrong', StatusCodes.SERVER_ERROR);
  }
};
