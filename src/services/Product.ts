import { ProductInput, ProductOutput } from '../models/Product';
import db from '../models';

export const getAllProduct = async (): Promise<ProductOutput[]> => {
  let allProducts = await db.Product.findAll({ raw: true });
  return allProducts;
};

export const getItemByKey = async (
  key: string,
  val: string | number
): Promise<ProductOutput[]> => {
  let data = await db.Product.findAll({
    where: {
      [key]: val,
    },
    raw: true,
  });

  return data;
};
