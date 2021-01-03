import { LOGOUT_USER, SET_CURRENT_USER, AUTH_ACTIONS } from '../actions/types';

export type AuthActions =
  | LoginUser
  | LoginSuccess
  | LoginUserError
  | SetCurrentUser
  | LogoutUser;

export interface AuthState {
  isAuthenticated: boolean;
  errors: {
    email?: string;
    password?: string;
  };
  user: null | {};
}

export interface LoginUser {
  type: typeof AUTH_ACTIONS.LOGIN;
  payload: LoginRequest;
}

interface LoginSuccess {
  type: typeof AUTH_ACTIONS.LOGIN_SUCCESS;
}

interface LoginUserError {
  type: typeof AUTH_ACTIONS.LOGIN_ERROR;
  errors: {
    email?: string;
  };
}

interface SetCurrentUser {
  type: typeof SET_CURRENT_USER;
  payload: any;
}

interface LogoutUser {
  type: typeof LOGOUT_USER;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
