import {
  GetCurrentUser,
  GetCurrentUserError,
  GetCurrentUserSuccess,
  NewUserData,
  RegisterNewUser,
  RegisterNewUserError,
  RegisterNewUserSuccess,
} from '../types/userTypes'
import { USER_ACTIONS } from './types'

export function registerUser(newUser: NewUserData): RegisterNewUser {
  return {
    type: USER_ACTIONS.REGISTER_USER,
    payload: newUser,
  }
}
export function registerUserSuccess(
  newUser: NewUserData
): RegisterNewUserSuccess {
  return {
    type: USER_ACTIONS.REGISTER_USER_SUCCESS,
    payload: newUser,
  }
}
export function registerUserError(error: string): RegisterNewUserError {
  return {
    type: USER_ACTIONS.REGISTER_USER_ERROR,
    error,
  }
}

export function getCurrentUser(): GetCurrentUser {
  return {
    type: USER_ACTIONS.GET_CURRENT_USER,
  }
}
export function getCurrentUserSuccess(): GetCurrentUserSuccess {
  return {
    type: USER_ACTIONS.GET_CURRENT_USER_SUCCESS,
  }
}
export function getCurrentUserErrur(error: string): GetCurrentUserError {
  return {
    type: USER_ACTIONS.GET_CURRENT_USER_ERROR,
    error,
  }
}
