// ************ Login ***********
export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  type: string;
  link: string;
  role: string;
  password: string;
  confirmPassword?: string;
  otp: number | null;
  otpExpireTime: string | null;
  isEmailVerified: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
}

export interface LoginResponse {
  data: {
    token: string;
    user: User;
  };
  error: Record<string, unknown>;
  message: string;
  status: number;
}

// ************ Forget Password ***********

export interface ForgetPasswordPayload {
  email: string;
}

// ************ Otp ***********

export interface OtpPayload {
  otp: string;
  email?: string | null;
}

// ************ Reset Password ***********

export interface ResetPasswordPayload {
  email?: string | null;
  newpassword: string;
}

export interface ResetPasswordFormValues {
  email?: string;
  password: string;
}

// ************ Change Password ***********

export interface ChangePasswordPayload {
  email?: string | null;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
