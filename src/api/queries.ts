import { KEYS, URL_KEYS } from "../constants";
// import { AccountResponse, ChannelsResponse, Params, SettingsResponse, TeamMemberResponse, TeamsResponse, UserListResponse } from "../types";
import get from "./get";
import { useApiGet } from "./hooks";

const queries = {
  useGetTeams: () => useApiGet<any>([KEYS.ALL_TEAMS], () => get(URL_KEYS.Product.GetAllProduct)),
  // useGetUserDetails: () => useApiGet<AccountResponse>([KEYS.USER], () => get(URL_KEYS.Profile.Details)),

  // useGetSettings: () =>
  //   useApiGet<SettingsResponse>([KEYS.SETTINGS], () => get(URL_KEYS.Settings.GetSettings), {
  //     staleTime: 1000 * 60 * 60,
  //   }),

  // useGetUsers: (params: Params) => useApiGet<UserListResponse>([KEYS.ALL_USERS, params], () => get(URL_KEYS.Users.GetAllUsers, params)),
  // useGetChannels: (params: Params) => useApiGet<ChannelsResponse>([KEYS.ALL_CHANNELS, params], () => get(URL_KEYS.Channels.GetAllChannels, params)),
  // useGetTeamMembers: (params: Params, teamId?: string) => useApiGet<TeamMemberResponse>([KEYS.TEAM_MEMBERS, params], () => get(URL_KEYS.Teams.TeamMembers, params, teamId ? { "X-Team-ID": teamId } : undefined)),
};

export default queries;
