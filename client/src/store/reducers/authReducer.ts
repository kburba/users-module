import JwtDecode from 'jwt-decode'
import { SET_CURRENT_USER, LOGOUT_USER, AUTH_ACTIONS } from '../actions/types'
import isEmpty from '../../validations/isEmpty'
import { AuthActions, AuthState } from '../types/authTypes'

function getInitialUserData() {
  const token = localStorage.getItem('access_token')
  if (token) {
    return JwtDecode<{ exp: number }>(token)
  }
  return null
}

const initialState: AuthState = {
  isAuthenticated: false,
  errors: {},
  user: getInitialUserData(),
}

export default (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState
    case AUTH_ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        errors: action.errors,
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    default:
      return state
  }
}
