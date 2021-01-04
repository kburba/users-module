import { AUTH_ACTIONS } from '../actions/types'
import {
  GetCurrentUser,
  GetCurrentUserError,
  GetCurrentUserSuccess,
} from './userTypes'

export type AuthActions =
  | LoginUser
  | LoginSuccess
  | LoginUserError
  | LogoutUser
  | GetCurrentUser
  | GetCurrentUserSuccess
  | GetCurrentUserError

export interface AuthState {
  isAuthenticated: boolean
  errors: {
    email?: string
    password?: string
  }
  user: null | { exp: number }
}

export interface LoginUser {
  type: typeof AUTH_ACTIONS.LOGIN
  payload: LoginRequest
}

export interface LoginSuccess {
  type: typeof AUTH_ACTIONS.LOGIN_SUCCESS
}

export interface LoginUserError {
  type: typeof AUTH_ACTIONS.LOGIN_ERROR
  errors: {
    email?: string
  }
}

export interface LogoutUser {
  type: typeof AUTH_ACTIONS.LOGOUT_USER
}
export interface LoginRequest {
  email: string
  password: string
}
export interface LoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}
