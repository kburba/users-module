import { USER_ACTIONS } from '../actions/types'

export type UsersState = {
  email: string
  name: string
}

export type NewUserData = {
  name: string
  email: string
  password: string
  password2: string
}

export interface RegisterNewUser {
  type: typeof USER_ACTIONS.REGISTER_USER
  payload: NewUserData
}
export interface RegisterNewUserSuccess {
  type: typeof USER_ACTIONS.REGISTER_USER_SUCCESS
  payload: NewUserData
}
export interface RegisterNewUserError {
  type: typeof USER_ACTIONS.REGISTER_USER_ERROR
  error: string
}

export interface GetCurrentUser {
  type: typeof USER_ACTIONS.GET_CURRENT_USER
}
export interface GetCurrentUserSuccess {
  type: typeof USER_ACTIONS.GET_CURRENT_USER_SUCCESS
  payload: CurrentUser | null
}
export interface GetCurrentUserError {
  type: typeof USER_ACTIONS.GET_CURRENT_USER_ERROR
  error: string
}

export type CurrentUser = {
  name: string
  email: string
  exp: number
  iat: number
}
