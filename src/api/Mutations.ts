import { KEYS, URL_KEYS } from "../constants";
import { ChangePasswordPayload, ForgetPasswordPayload, LoginPayload, LoginResponse, OtpPayload, ResetPasswordPayload, SettingFormValues, UploadResponse, UserPayload } from "../types";
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
  
  // ************ Upload ***********
  useUpload: () => useApiPost<FormData, UploadResponse>([KEYS.UPLOAD.ALL_UPLOAD], (input) => Post(URL_KEYS.Upload.Add, input)),
  useDeleteUpload: () => useApiDelete<{ imageUrl: string }, void>([KEYS.UPLOAD.DELETE_UPLOAD, KEYS.UPLOAD.ALL_UPLOAD], (id) => Delete(`${URL_KEYS.Upload.Delete}`, id)),

  // ************ User Setting ***********
  useUserSetting: () => useApiPost<SettingFormValues, void>([KEYS.USER_SETTING.ADD_USER_SETTING], (input) => Post(URL_KEYS.UserSetting.Add, input)),
  useEditUserSetting: () => useApiPost<{ settingId: string } & SettingFormValues, void>([KEYS.USER_SETTING.EDIT_USER_SETTING, KEYS.USER_SETTING.ALL_USER_SETTING], (input) => Post(URL_KEYS.UserSetting.Edit, input)),
  useDeleteUserSetting: () => useApiDelete<string, void>([KEYS.USER_SETTING.DELETE_USER_SETTING, KEYS.USER_SETTING.ALL_USER_SETTING], (id) => Delete(`${URL_KEYS.UserSetting.Delete}/${id}`)),
  // useUpdateSetting: () => useApiPost<SettingsPayload, void>([KEYS.SETTINGS_UPDATE, KEYS.SETTINGS], (input) => put(URL_KEYS.Settings.UpdateSettings, input)),
  // useUpdateUserStatus: () =>
  // useApiPost([KEYS.UPDATE_USER_STATUS, KEYS.ALL_USERS], (input: any) => {
  // return put(URL_KEYS.Users.UpdateUserStatus.replace(":id", input?.id.toString()), { status: input?.status });
  // }),
};

export default Mutations;
