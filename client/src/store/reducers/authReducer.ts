import {
  SET_CURRENT_USER,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../actions/types';
import isEmpty from '../../validations/isEmpty';
import { AuthActions, AuthState } from '../types/authTypes';
import JwtDecode from 'jwt-decode';

function getInitialUserData() {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return JwtDecode<{ exp: number }>(token);
  }
  return null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  errors: {},
  user: getInitialUserData(),
};

export default (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOGIN_USER_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
