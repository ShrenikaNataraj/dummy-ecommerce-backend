export interface IModalCategory {
  cat_id: number;
  name: string;
  total: number;
}

export interface IModalProduct {
  p_id: number;
  cat_id: number;
  name: string;
  price: string;
  quantity: number;
  desc: string;
}

export interface IModalOrderDetails {
  o_id: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  total_price: number;
}

export interface IModalOrderItem {
  o_item_id: number;
  o_id: number;
  p_id: number;
  quantity: number;
  price: number;
}
