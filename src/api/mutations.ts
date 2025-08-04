import { KEYS, URL_KEYS } from "../constants";
// import { AccountPayload, ResetPasswordPayload, SettingsPayload, UpdatePasswordPayload } from '../types'
import Delete from "./Delete";
import { useApiDelete, useApiPost } from "./hooks";
import Post from "./Post";

const Mutations = {
  // useRequestForgotPassword: () => useApiPost<{ email: string }, void>([KEYS.SEND_PASSWORD_EMAIL], (input) => post(URL_KEYS.Auth.ForgotPassword, input)),

  // useVerifyOtp: () => useApiPost<{ email: string | null; otp: string }, void>([KEYS.VERIFY_OTP], (input) => post(URL_KEYS.Auth.VerifyOtp, input)),
  // useResendOtp: () => useApiPost<{ email: string | null }, void>([KEYS.RESEND_OTP], (input) => post(URL_KEYS.Auth.ResendOtp, input)),
  // useResetPassword: () => useApiPost<ResetPasswordPayload, void>([KEYS.RESET_PASSWORD], (input) => post(URL_KEYS.Auth.ResetPassword, input)),
  // useUpdateProfile: () => useApiPost<AccountPayload | FormData, void>([KEYS.USER_UPDATE, KEYS.USER], (input) => put(URL_KEYS.Profile.UpdateDetails, input)),
  // useUpdatePassword: () => useApiPost<UpdatePasswordPayload, void>([KEYS.PASSWORD_UPDATE], (input) => put(URL_KEYS.Profile.UpdatePassword, input)),
  // useUpdateSetting: () => useApiPost<SettingsPayload, void>([KEYS.SETTINGS_UPDATE, KEYS.SETTINGS], (input) => put(URL_KEYS.Settings.UpdateSettings, input)),
  // useDeleteUser: () => useApiDelete([KEYS.DELETE_USER, KEYS.ALL_USERS], (input: any) => remove(URL_KEYS.Users.DeleteUser.replace(":id", input.toString()))),
  // useUpdateUserStatus: () =>
    // useApiPost([KEYS.UPDATE_USER_STATUS, KEYS.ALL_USERS], (input: any) => {
      // return put(URL_KEYS.Users.UpdateUserStatus.replace(":id", input?.id.toString()), { status: input?.status });
    // }),
};

export default Mutations;
