import { ProductInput, ProductOutput } from '../models/Product';
import db from '../models';
import { camelCaseToSnakeCase, paginate } from '../utility';
import { Op } from 'sequelize';

import { Request, Response } from 'express';
import { IPaginateReturnValue, IRequestQueryParams, ISearchQuery, StatusCodes } from '../types';
import { HttpError } from '../routes/helper/helper';

export const getItemByKey = async (
  key: string,
  val: string | number
): Promise<ProductOutput[]> => {
  let keyVal = camelCaseToSnakeCase(key);
  let data:ProductOutput[] = await db.Product.findAll({
    where: {
      [keyVal]: val,
    },
    raw: true,
  });

  return data;
};

export const listProducts = async(req:Request<{}, {}, {}, IRequestQueryParams>, res:Response) => {
  try {
      // get the query params
      const { q, page, limit, order_by, order_direction } = req.query;

      let search:ISearchQuery;
      let order = [];

      // add the search term to the search object
      if (q) {
          search = {
              where: {
                  name: {
                      [Op.iLike]: `%${q}%`
                  }
              }
          };
      }

      // add the order parameters to the order
      if (order_by && order_direction) {
          order.push([order_by, order_direction]);
      }

      // paginate method that takes in the model, page, limit, search object, order and transform
      const products:IPaginateReturnValue = await paginate(db.Product, Number(page), Number(limit), search, order);

      if((products.data.length) === 0) {
        throw new HttpError("Product not found", 404)
      }

      return res.status(200).send({
          success: true,
          message: 'Fetched products',
          data: products
      })
  } catch (error) {
      console.log('Failed to fetch products', error);
      return res.status(error.statusCode).send({
          success: false,
          message: error.message
      })
  }
}