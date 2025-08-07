import { KEYS, URL_KEYS } from "../constants";
import { Params, SettingApiResponse, UserDataApiResponse } from "../types";
// import { AccountResponse, ChannelsResponse, Params, SettingsResponse, TeamMemberResponse, TeamsResponse, UserListResponse } from "../types";
import Get from "./Get";
import { useApiGet } from "./hooks";

const Queries = {
  // ************ User ***********
  useGetUser: (params: Params) => useApiGet<UserDataApiResponse>([KEYS.USER.ALL_USER, params], () => Get(URL_KEYS.User.GetAllUser, params)),

  // ************ User Setting ***********
  useGetUserSetting: (params: Params) => useApiGet<SettingApiResponse>([KEYS.USER_SETTING.ALL_USER_SETTING, params], () => Get(URL_KEYS.UserSetting.GetAllUserSetting, params)),

  // useGetUserDetails: () => useApiGet<AccountResponse>([KEYS.USER], () => get(URL_KEYS.Profile.Details)),

  // useGetSettings: () =>
  //   useApiGet<SettingsResponse>([KEYS.SETTINGS], () => get(URL_KEYS.Settings.GetSettings), {
  //     staleTime: 1000 * 60 * 60,
  //   }),

  // useGetUsers: (params: Params) => useApiGet<UserListResponse>([KEYS.ALL_USERS, params], () => get(URL_KEYS.Users.GetAllUsers, params)),
  // useGetChannels: (params: Params) => useApiGet<ChannelsResponse>([KEYS.ALL_CHANNELS, params], () => get(URL_KEYS.Channels.GetAllChannels, params)),
  // useGetTeamMembers: (params: Params, teamId?: string) => useApiGet<TeamMemberResponse>([KEYS.TEAM_MEMBERS, params], () => get(URL_KEYS.Teams.TeamMembers, params, teamId ? { "X-Team-ID": teamId } : undefined)),
};

export default Queries;
