import { takeLatest, put, call } from 'redux-saga/effects'
import { AUTH_ACTIONS } from '../actions/types'
import { loginUserError } from '../actions/authActions'
import setAuthToken from '../../utils/setAuthToken'
import { loginApi } from '../storeUtils'
import { history } from '../../App'
import { LoginResponse, LoginUser } from '../types/authTypes'
import { getCurrentUser, getCurrentUserSuccess } from '../actions/userActions'

function* logoutUserSaga() {
  try {
    // Remove token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    // Delete auth token
    setAuthToken(null)

    // set current user to empty object
    yield put(getCurrentUserSuccess(null))

    // Redirect to login
    history.push('/login')
  } catch (error) {
    console.log('error', error)
  }
}

function* loginUserSaga({ payload }: LoginUser) {
  try {
    const { email, password } = payload
    const response: LoginResponse = yield call(loginApi, { email, password })
    // Save to localStorage
    const { access_token, refresh_token } = response

    yield localStorage.setItem('access_token', `Bearer ${access_token}`)
    yield localStorage.setItem('refresh_token', refresh_token)

    // Set access token to Auth header
    setAuthToken(access_token)

    // Set current user
    yield put(getCurrentUser())
    history.push('/')
  } catch (error) {
    yield put(loginUserError(error.response.data))
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(AUTH_ACTIONS.LOGIN, loginUserSaga)
  yield takeLatest(AUTH_ACTIONS.LOGOUT_USER, logoutUserSaga)
}
