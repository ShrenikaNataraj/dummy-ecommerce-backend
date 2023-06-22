import { ProductOutput } from "../models/Product";
import { HttpError } from "../routes/helper/helper";
import { StatusCodes } from "../types";

export const camelCaseToSnakeCase = (keyValue: string): string => {
  let regex = /\.?(?=[A-Z])/;
  return keyValue.split(regex).join('_').toLocaleLowerCase();
};

export const paginate = async (model, pageSize:number, pageLimit:number, search = {}, order = []) => {
  try {
      const limit = pageLimit || 10;
      const page = pageSize || 1;

      // create an options object
      let options:any = {
          offset: getOffset(page, limit),
          limit: limit,
      };

      // check if the search object is empty
      if (Object.keys(search).length) {
          options = {options, ...search};
      }

      // check if the order array is empty
      if (order && order.length) {
          options['order'] = order;
      }

      // take in the model, take in the options
      let {count, rows}:{count:number, rows:ProductOutput[]} = await model.findAndCountAll(options);

      return {
          previousPage: getPreviousPage(page),
          currentPage: page,
          nextPage: getNextPage(page, limit, count),
          total: count,
          limit: limit,
          data: rows
      }
  } catch (error) {
    throw new HttpError('Something Went Wrong!!',StatusCodes.SERVER_ERROR)
  }
}

const getOffset = (page:number, limit:number):number => {
return (page * limit) - limit;
}

const getNextPage = (page:number, limit:number, total:number):number => {
  if ((total/limit) > page) {
      return page + 1;
  }

  return null
}

const getPreviousPage = (page:number):number => {
  if (page <= 1) {
      return null
  }
  return page - 1;
}