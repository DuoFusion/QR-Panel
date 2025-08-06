import { KEYS, URL_KEYS } from "../constants";
import { ChangePasswordPayload, ForgetPasswordPayload, LoginPayload, LoginResponse, OtpPayload, ResetPasswordPayload, UserPayload } from "../types";
import Delete from "./Delete";
import { useApiDelete, useApiPost } from "./hooks";
import Post from "./Post";

const Mutations = {
  // ************ Auth ***********
  useLogin: () => useApiPost<LoginPayload, LoginResponse>([KEYS.LOGIN], (input) => Post(URL_KEYS.Auth.Login, input)),
  useRequestForgotPassword: () => useApiPost<ForgetPasswordPayload, void>([KEYS.SEND_PASSWORD_EMAIL], (input) => Post(URL_KEYS.Auth.ForgotPassword, input, false)),
  useVerifyOtp: () => useApiPost<OtpPayload, void>([KEYS.VERIFY_OTP], (input) => Post(URL_KEYS.Auth.VerifyOtp, input)),
  useResetPassword: () => useApiPost<ResetPasswordPayload, LoginResponse>([KEYS.RESET_PASSWORD], (input) => Post(URL_KEYS.Auth.ResetPassword, input)),
  useChangePassword: () => useApiPost<ChangePasswordPayload, void>([KEYS.ChANGE_PASSWORD], (input) => Post(URL_KEYS.Auth.ChangePassword, input)),

  // ************ User ***********
  useUser: () => useApiPost<UserPayload, void>([KEYS.USER.ADD_USER], (input) => Post(URL_KEYS.User.Add, input)),
  useDeleteUser: () => useApiDelete<string, void>([KEYS.USER.DELETE_USER, KEYS.USER.ALL_USER], (id) => Delete(`${URL_KEYS.User.Delete}/${id}`)),
  useEditUser: () => useApiPost<{ userId: string } & UserPayload, void>([KEYS.USER.EDIT_USER, KEYS.USER.ALL_USER], (input) => Post(URL_KEYS.User.Edit, input)),

  // useUpdateSetting: () => useApiPost<SettingsPayload, void>([KEYS.SETTINGS_UPDATE, KEYS.SETTINGS], (input) => put(URL_KEYS.Settings.UpdateSettings, input)),
  // useUpdateUserStatus: () =>
  // useApiPost([KEYS.UPDATE_USER_STATUS, KEYS.ALL_USERS], (input: any) => {
  // return put(URL_KEYS.Users.UpdateUserStatus.replace(":id", input?.id.toString()), { status: input?.status });
  // }),
};

export default Mutations;
