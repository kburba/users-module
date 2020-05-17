import { SET_CURRENT_USER, LOGIN_USER_ERROR } from '../actions/types';
import isEmpty from '../../validations/isEmpty';
import { AuthActions, AuthState } from '../types/authTypes';

const initialState: AuthState = {
  isAuthenticated: false,
  errors: {},
  user: {},
};

export default (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
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
