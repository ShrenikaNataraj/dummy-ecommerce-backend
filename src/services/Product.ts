import { ProductInput, ProductOutput } from '../models/Product';
import db from '../models';
import { camelCaseToSnakeCase } from '../utility';
import { Op } from 'sequelize';
import { paginate } from '../utility/paginate';
import { Request, Response } from 'express';

export const getAllProduct = async (): Promise<ProductOutput[]> => {
  let allProducts:ProductOutput[] = await db.Product.findAll({ raw: true });
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

export const listProducts = async(req:Request, res:Response) => {
  try {
      // get the query params
      const { q, page, limit, order_by, order_direction } = req.query;

      let search = {};
      let order = [];

      // add the search term to the search object
      if (q) {
          search = {
              where: {
                  name: {
                      [Op.like]: `%${q}%`
                  }
              }
          };
      }

      // add the order parameters to the order
      if (order_by && order_direction) {
          order.push([order_by, order_direction]);
      }

      // paginate method that takes in the model, page, limit, search object, order and transform
      const products = await paginate(db.Product, page, limit, search, order);

      return res.status(200).send({
          success: true,
          message: 'Fetched products',
          data: products
      })
  } catch (error) {
      console.log('Failed to fetch products', error);
      return res.status(500).send({
          success: false,
          message: 'Failed to fetch products'
      })
  }
}