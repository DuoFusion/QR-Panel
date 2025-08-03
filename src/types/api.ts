export type ResponseParserWrapper<T> = {
  data: T
  status: number
}

export interface Message {
  code: string
  message: string
  values: string[]
}

export type DefaultErrorResponse = ResponseParserWrapper<Message[]>

export type FormErrorResponse = ResponseParserWrapper<Record<string, { code: string; values: string[] }[]>>

export type CombinedErrorResponse = DefaultErrorResponse | FormErrorResponse

export interface Params {
  [key: string]: any
}
export interface AccountResponse {
  user: {
    name: string
    avatar: string
    phone: string | null
    country: string | null
    country_code: null
    email: string | null
  }
}

export interface AccountPayload {
  name?: string
  avatar?: string
  phone?: string
  country?: string
  country_code?: string
  email?: string
}

export interface UpdatePasswordPayload {
  password: string
  old_password: string
}

export interface ResetPasswordPayload {
  new_password: string
  email: string
  otp: string
}

export interface SettingsResponse {
  settings: {
    logo_url: string
    app_name: string
    smtp_host: string | null
    support_email: string
    smtp_port: number | string | null
    smtp_user: string | null
    mail_from_name: string | null
    mail_from_email: string | null
    smtp_pass: string | null
  }
}

export interface SettingsPayload {
  logo_url?: string
  app_name?: string
  smtp_host?: string | null
  support_email?: string
  smtp_port?: number | string | null
  smtp_user?: string | null
  mail_from_name?: string | null
  mail_from_email?: string | null
  smtp_pass?: string | null
}

export interface SingleUser {
  id: number
  avatar: string
  name: string
  email: string
  country_code: string
  phone: string
  role: 'super_admin' | 'admin' | 'user' | string // Extend or refine as needed
  email_verified: boolean
  last_login: string
  created_at: string
  Teams: any[]
  status: string
}

export interface UserListResponse {
  total: number
  page: number
  limit: number
  users: SingleUser[]
}

export interface TeamUser {
  id: number
  name: string
  email: string
}

export interface SingleTeam {
  id: number
  name: string
  created_at: string
  created_by: TeamUser
  total_members: number
  admins: TeamUser[]
}

export interface TeamsResponse {
  total: number
  page: number
  limit: number
  teams: SingleTeam[]
}

export interface SingleTeamMember {
  id: number
  name: string
  email: string
  avatar: string // ISO string format
  phone: TeamUser
  country_code: number
  team_role: string
  status: string
}

export interface RoleCounts {
  admins: number
  pending: number
  deactivated: number
}
export interface TeamMemberResponse {
  total: number
  page: number
  limit: number
  members: SingleTeamMember[]
  counts: RoleCounts
}

export interface ChannelTeam {
  id: number
  name: string
}

export interface SingleChannel {
  id: number
  name: string
  created_at: string
  created_by: TeamUser
  total_members: number
  admins: TeamUser[]
  team: ChannelTeam
}

export interface ChannelsResponse {
  total: number
  page: number
  limit: number
  teams: SingleChannel[]
}
