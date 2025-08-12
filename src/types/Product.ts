import { SettingType } from "./Setting";
import { MessageStatus, PageStatus } from "./Shared";
import { UserType } from "./User";

export interface ProductFormValues {
  image?: string | string[];
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  userId?: string;
  settingId?: string;
}

export interface ProductType extends Omit<Required<ProductFormValues>, "userId" | "settingId"> {
  _id: string;
  userId: UserType;
  settingId: SettingType;
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
