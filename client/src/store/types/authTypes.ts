import {
  LOGOUT_USER,
  SET_CURRENT_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER,
} from '../actions/types';

export type AuthActions =
  | LoginUser
  | LoginUserError
  | SetCurrentUser
  | LogoutUser;

export interface AuthState {
  isAuthenticated: boolean;
  errors: {
    email?: string;
    password?: string;
  };
  user: {};
}

interface LoginUser {
  type: typeof LOGIN_USER;
  payload: {
    email: string;
    password: string;
  };
}

interface LoginUserError {
  type: typeof LOGIN_USER_ERROR;
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

export interface LoginUserType {
  type: typeof LOGIN_USER;
  payload: { email: string; password: string };
}
