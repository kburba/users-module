import { AuthActions, LoginSuccess, LogoutUser } from '../types/authTypes'

import { AUTH_ACTIONS } from './types'

// Login registered user
export function loginUser(email: string, password: string): AuthActions {
  return {
    type: AUTH_ACTIONS.LOGIN,
    payload: { email, password },
  }
}

export function loginUserSuccess(): LoginSuccess {
  return {
    type: AUTH_ACTIONS.LOGIN_SUCCESS,
  }
}

export function loginUserError(errors: { email?: string }): AuthActions {
  return {
    type: AUTH_ACTIONS.LOGIN_ERROR,
    errors,
  }
}

// Logout user
export function logoutUser(): LogoutUser {
  return {
    type: AUTH_ACTIONS.LOGOUT_USER,
  }
}
