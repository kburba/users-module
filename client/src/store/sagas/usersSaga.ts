import { takeLatest, put, call } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/types';
import { setCurrentUser } from '../actions/authActions';
import { apiFetch } from '../storeUtils';
import { RegisterNewUser } from '../types/userTypes';

function* getCurrentUserSaga() {
  try {
    const response = yield call(apiFetch, '/api/users/me');
    yield put(setCurrentUser(response.data));
  } catch (e) {
    console.log('error current user', e.message);
  }
}

function* registerUserSaga({ payload }: RegisterNewUser) {
  try {
    const response = yield call(apiFetch, '/api/users/register', {
      method: 'POST',
      data: payload,
    });
    yield put(setCurrentUser(response));
  } catch (e) {
    console.log('error current user', e.message);
  }
}

export default function* watchUsersSaga() {
  yield takeLatest(USER_ACTIONS.GET_CURRENT_USER, getCurrentUserSaga);
  yield takeLatest(USER_ACTIONS.REGISTER_USER, registerUserSaga);
}
