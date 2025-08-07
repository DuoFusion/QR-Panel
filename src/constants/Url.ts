export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const URL = {
  Auth: {
    Login: "/auth/login",
    ForgotPassword: "/auth/forgot_password",
    VerifyOtp: "/auth/verify_otp",
    ResetPassword: "/auth/reset_password",
    ChangePassword: "/auth/change-password",
  },
  User: {
    GetAllUser: "/users",
    Add: "/users/add",
    Delete: "/users/delete",
    Edit: "/users/edit",
  },
  Upload: {
    Add: "/upload",
    Delete: "/upload",
  },
  UserSetting: {
    GetAllUserSetting: "/setting",
    Add: "/setting/add",
    Delete: "/setting/delete",
    Edit: "/setting/edit",
  },
} as const;

// Construct the URL object
export const URL_KEYS: { [K in keyof typeof URL]: { [P in keyof (typeof URL)[K]]: string } } = Object.fromEntries(Object.entries(URL).map(([key, subKeys]) => [key, Object.fromEntries(Object.entries(subKeys).map(([subKey, path]) => [subKey, `${BASE_URL}${path}`]))])) as {
  [K in keyof typeof URL]: { [P in keyof (typeof URL)[K]]: string };
};
