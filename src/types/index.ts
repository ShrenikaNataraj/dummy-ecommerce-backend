import { Op } from "sequelize";

export interface IModalCategory {
  catId: number;
  name: string;
  total: number;
}

export interface IModalProduct {
  pId: number;
  catId: number;
  catName: string;
  name: string;
  price: number;
  quantity: number;
  desc: string;
  barId: number;
}

export interface IModalOrderDetails {
  oId: number;
  // createdAt?: Date;
  // updatedAt?: Date;
  email: string;
  totalPrice: number;
}

export interface IModalOrderItem {
  oItemId: number;
  oId: number;
  pId: number;
  quantity: number;
  price: number;
}

export interface IOrderRequestEntity {
  pId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrderRequest {
  email: string;
  products: IOrderRequestEntity[];
}

export interface IPaginateReturnValue {
  previousPage: number | null,
  currentPage: number,
  nextPage: number | null,
  total: number,
  limit: number,
  data: IModalProduct[]
}

export interface IRequestQueryParams {
  q:string, 
  page:number, 
  limit:number, 
  order_by:string, 
  order_direction:string
}

export interface ISearchQuery {
  where: {
    name?: {
        [Op.iLike]: string
    }
  }
}

export enum StatusCodes {
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  USER_ERROR = 400,
}