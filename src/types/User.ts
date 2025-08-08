import { MessageStatus, PageStatus } from "./Shared";

export interface UserPayload {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  password?: string;
  email?: string;
  link?: string;
  address?: string;
}

export type UserFormValues = Required<Omit<UserPayload, "password">> & {
  password: string;
  confirmPassword?: string;
};

export interface UserType extends Required<UserPayload> {
  _id: string;
  role: "admin" | "user";
  password: string;
  otp?: number | null;
  otpExpireTime?: string | null;
  isEmailVerified: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserDataResponse extends PageStatus {
  User_data: UserType[];
}

export interface UserDataApiResponse extends MessageStatus {
  data: UserDataResponse;
}
