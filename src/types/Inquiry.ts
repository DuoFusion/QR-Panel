import { MessageStatus, PageStatus } from "./Shared";
import { UserType } from "./User";

export interface InquiryType {
  _id: string;
  userId: UserType;
  name: string;
  description: string;
  price: string;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryDataResponse extends PageStatus {
  inquiry_data: InquiryType[];
}

export interface InquiryApiResponse extends MessageStatus {
  data: InquiryDataResponse;
}
