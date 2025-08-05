import { createSlice } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '../../constants'
import { getStorage, stringify } from '../../utils'

const storage = getStorage()
const storedUser = storage.getItem(STORAGE_KEYS.USER)

const initialState = {
  token: storage.getItem(STORAGE_KEYS.TOKEN) || null,
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storage.getItem(STORAGE_KEYS.TOKEN),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
      storage.setItem(STORAGE_KEYS.USER, stringify(action.payload.user))
      storage.setItem(STORAGE_KEYS.TOKEN, action.payload.token)
    },
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      storage.clear()
    },
    setForgotPasswordEmail: (_, action) => {
      storage.setItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL, action.payload)
    },
    clearForgotPasswordEmail: () => {
      storage.removeItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL)
      storage.removeItem(STORAGE_KEYS.OTP_TOKEN)
      storage.removeItem(STORAGE_KEYS.RESEND_COOLDOWN_KEY)
    },
  },
})

export const { loginSuccess, logout, clearForgotPasswordEmail, setForgotPasswordEmail } = authSlice.actions

export default authSlice.reducer
