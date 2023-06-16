export interface IModalCategory {
  catId: number;
  name: string;
  total: number;
}

export interface IModalProduct {
  pId: number;
  catId: number;
  name: string;
  price: number;
  quantity: number;
  desc: string;
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
