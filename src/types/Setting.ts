import { MessageStatus, PageStatus } from "./Shared";
import { UserType } from "./User";

export interface SettingFormValues {
  title?: string;
  email?: string;
  phoneNumber?: string;
  content?: string;
  address?: string;
  userId?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  location?: string;
  qrCode?: string;
  logoImage?: string | string[];
  bannerImage?: string | string[];
  primary?: string;
  secondary?: string;
  backgroundColor?: string;
}

export interface SocialLinks {
  whatsapp: string;
  instagram: string;
  facebook: string;
  location: string;
}

export interface SettingType extends Omit<Required<SettingFormValues>, "userId"> {
  _id: string;
  userId: UserType;
  socialLinks: SocialLinks;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SettingDataResponse extends PageStatus {
  setting_data: SettingType[];
}

export interface SettingApiResponse extends MessageStatus {
  data: SettingDataResponse;
}
