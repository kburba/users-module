import setAuthToken from '../../utils/setAuthToken';
import { AuthActions } from '../types/authTypes';

import { SET_CURRENT_USER, LOGOUT_USER, AUTH_ACTIONS } from './types';
import { history } from '../../App';

// Login registered user
export function loginUser(email: string, password: string): AuthActions {
  return {
    type: AUTH_ACTIONS.LOGIN,
    payload: { email, password },
  };
}

export function loginUserSuccess() {
  return {
    type: AUTH_ACTIONS.LOGIN_SUCCESS,
  };
}

export function loginUserError(errors: { email?: string }): AuthActions {
  return {
    type: AUTH_ACTIONS.LOGIN_ERROR,
    errors,
  };
}

// Set logged user
export function setCurrentUser(decoded): AuthActions {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
}

// Logout user
export function logoutUser(): AuthActions {
  // Remove token from local storage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  // Delete auth token
  setAuthToken(null);

  // set current user to empty object
  setCurrentUser({});

  // Redirect to login
  history.push('/login');

  return {
    type: LOGOUT_USER,
  };
}
