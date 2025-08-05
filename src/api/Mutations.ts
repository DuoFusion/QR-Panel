import { KEYS, URL_KEYS } from "../constants";
import { ChangePasswordPayload, ForgetPasswordPayload, LoginPayload, LoginResponse, OtpPayload, ResetPasswordPayload } from "../types";
import { useApiPost } from "./hooks";
import Post from "./Post";

const Mutations = {
  useLogin: () => useApiPost<LoginPayload, LoginResponse>([KEYS.LOGIN], (input) => Post(URL_KEYS.Auth.Login, input)),
  useRequestForgotPassword: () => useApiPost<ForgetPasswordPayload, void>([KEYS.SEND_PASSWORD_EMAIL], (input) => Post(URL_KEYS.Auth.ForgotPassword, input,false)),
  useVerifyOtp: () => useApiPost<OtpPayload, void>([KEYS.VERIFY_OTP], (input) => Post(URL_KEYS.Auth.VerifyOtp, input)),
  useResetPassword: () => useApiPost<ResetPasswordPayload, LoginResponse>([KEYS.RESET_PASSWORD], (input) => Post(URL_KEYS.Auth.ResetPassword, input)),
  useChangePassword: () => useApiPost<ChangePasswordPayload, void>([KEYS.ChANGE_PASSWORD], (input) => Post(URL_KEYS.Auth.ChangePassword, input)),

  // useResendOtp: () => useApiPost<{ email: string | null }, void>([KEYS.RESEND_OTP], (input) => post(URL_KEYS.Auth.ResendOtp, input)),
  // useUpdateProfile: () => useApiPost<AccountPayload | FormData, void>([KEYS.USER_UPDATE, KEYS.USER], (input) => put(URL_KEYS.Profile.UpdateDetails, input)),
  // useUpdateSetting: () => useApiPost<SettingsPayload, void>([KEYS.SETTINGS_UPDATE, KEYS.SETTINGS], (input) => put(URL_KEYS.Settings.UpdateSettings, input)),
  // useDeleteUser: () => useApiDelete([KEYS.DELETE_USER, KEYS.ALL_USERS], (input: any) => remove(URL_KEYS.Users.DeleteUser.replace(":id", input.toString()))),
  // useUpdateUserStatus: () =>
  // useApiPost([KEYS.UPDATE_USER_STATUS, KEYS.ALL_USERS], (input: any) => {
  // return put(URL_KEYS.Users.UpdateUserStatus.replace(":id", input?.id.toString()), { status: input?.status });
  // }),
};

export default Mutations;
