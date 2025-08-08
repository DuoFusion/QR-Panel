import { MessageStatus, PageStatus } from "./Shared";
import { UserType } from "./User";

export interface ProductFormValues {
  image?: string | string[];
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  userId?: string;
}

export interface ProductType extends Omit<Required<ProductFormValues>, "userId">  {
  _id: string;
  userId: UserType;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDataResponse extends PageStatus {
  product_data: ProductType[];
}

export interface ProductApiResponse extends MessageStatus {
  data: ProductDataResponse;
}
