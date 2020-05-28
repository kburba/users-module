import { takeLatest, put, call } from 'redux-saga/effects';
import Axios from 'axios';
import { LOGIN_USER, GET_CURRENT_USER } from '../actions/types';
import {
  setCurrentUser,
  loginUserError,
  getCurrentUser,
} from '../actions/authActions';
import setAuthToken from '../../utils/setAuthToken';

interface LoginUserType {
  type: typeof LOGIN_USER;
  payload: { email: string; password: string };
}

function loginApi(authParams) {
  return Axios.post('/api/users/login', authParams)
    .then((response) => response)
    .catch((errors) => {
      throw errors;
    });
}

function* loginUserSaga({ payload }: LoginUserType) {
  try {
    const { email, password } = payload;
    const response = yield call(loginApi, { email, password });
    // Save to localStorage
    const { token, refreshToken } = response.data;

    yield localStorage.setItem('jwtToken', token);
    yield localStorage.setItem('refreshToken', refreshToken);

    // Set token to Auth header
    setAuthToken(token);

    // Set current user
    yield put(getCurrentUser());
  } catch (error) {
    yield put(loginUserError(error.response.data));
  }
}

function* getCurrentUserSaga() {
  try {
    const response = yield call(Axios.get, '/api/users/me');
    console.log('response', response.data);
    yield put(setCurrentUser(response.data));
  } catch (e) {
    console.log('error current user', e.message);
  }
}

export default function* authWatcherSaga() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
  yield takeLatest(GET_CURRENT_USER, getCurrentUserSaga);
}
