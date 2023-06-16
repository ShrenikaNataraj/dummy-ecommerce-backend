import { ProductInput, ProductOutput } from '../models/Product';
import db from '../models';
import { camelCaseToSnakeCase } from '../utility';

export const getAllProduct = async (): Promise<ProductOutput[]> => {
  let allProducts = await db.Product.findAll({ raw: true });
  return allProducts;
};

export const getItemByKey = async (
  key: string,
  val: string | number
): Promise<ProductOutput[]> => {
  let keyVal = camelCaseToSnakeCase(key);
  let data = await db.Product.findAll({
    where: {
      [keyVal]: val,
    },
    raw: true,
  });

  return data;
};
