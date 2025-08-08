import { ProductType } from "./Product";
import { MessageStatus, PageStatus } from "./Shared";
import { UserType } from "./User";

export interface OrderType {
  _id: string;
  userId: UserType;
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  price: string;
  productId: ProductType;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDataResponse extends PageStatus {
  order_data: OrderType[];
}

export interface OrderApiResponse extends MessageStatus {
  data: OrderDataResponse;
}
