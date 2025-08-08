export const KEYS = {
  LOGIN: "admin-login",
  SEND_PASSWORD_EMAIL: "forgot-password-request",
  VERIFY_OTP: "verify-otp",
  RESET_PASSWORD: "reset-password",
  ChANGE_PASSWORD: "change-password",
  USER: {
    ALL_USER: "user",
    ADD_USER: "add-user",
    DELETE_USER: "delete-user",
    EDIT_USER: "edit-user",
  },
  UPLOAD: {
    ALL_UPLOAD: "upload",
    DELETE_UPLOAD: "upload",
  },
  USER_SETTING: {
    ALL_USER_SETTING: "setting",
    ADD_USER_SETTING: "add-setting",
    DELETE_USER_SETTING: "delete-setting",
    EDIT_USER_SETTING: "edit-setting",
  },
  PRODUCT: {
    ALL_PRODUCT: "product",
    ADD_PRODUCT: "add-product",
    DELETE_PRODUCT: "delete-product",
    EDIT_PRODUCT: "edit-product",
  },
  INQUIRY: {
    ALL_INQUIRY: "inquiry",
    DELETE_INQUIRY: "delete-inquiry",
  },
  ORDER: {
    ALL_ORDER: "order",
    DELETE_ORDER: "delete-order",
  },
  ALL_TEAMS: "all-teams",
} as const;
