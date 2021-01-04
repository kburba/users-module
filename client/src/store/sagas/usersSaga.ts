import { takeLatest, put, call } from 'redux-saga/effects'
import { USER_ACTIONS } from '../actions/types'
import { apiFetch } from '../storeUtils'
import {
  getCurrentUserError,
  getCurrentUserSuccess,
} from '../actions/userActions'
import { history } from '../../App'
import { RegisterNewUser } from '../types/userTypes'

function* getCurrentUserSaga() {
  try {
    const response = yield call(apiFetch, '/api/users/me')
    yield put(getCurrentUserSuccess(response.data))
  } catch (e) {
    yield put(getCurrentUserError(e))

    console.log('error current user', e.message)
  }
}

function* registerUserSaga({ payload }: RegisterNewUser) {
  try {
    yield call(apiFetch, '/api/users/register', {
      method: 'POST',
      data: payload,
    })
    history.push('/login')
  } catch (e) {
    console.log('error current user', e.message)
  }
}

export default function* watchUsersSaga() {
  yield takeLatest(USER_ACTIONS.GET_CURRENT_USER, getCurrentUserSaga)
  yield takeLatest(USER_ACTIONS.REGISTER_USER, registerUserSaga)
}
