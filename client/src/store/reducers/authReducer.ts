import JwtDecode from 'jwt-decode'
import { AUTH_ACTIONS, USER_ACTIONS } from '../actions/types'
import isEmpty from '../../validations/isEmpty'
import { AuthActions, AuthState } from '../types/authTypes'
import { CurrentUser } from '../types/userTypes'

function getInitialUserData(): CurrentUser | null {
  const token = localStorage.getItem('access_token')
  if (token) {
    return JwtDecode<CurrentUser>(token)
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
    case AUTH_ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        errors: action.errors,
      }
    case AUTH_ACTIONS.LOGOUT_USER:
      return initialState
    case USER_ACTIONS.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    default:
      return state
  }
}
