import { takeLatest, put, call } from 'redux-saga/effects';
import { AUTH_ACTIONS } from '../actions/types';
import { loginUserError } from '../actions/authActions';
import setAuthToken from '../../utils/setAuthToken';
import { loginApi } from '../storeUtils';
import { history } from '../../App';
import { LoginResponse, LoginUser } from '../types/authTypes';
import { getCurrentUser } from '../actions/userActions';

function* loginUserSaga({ payload }: LoginUser) {
  try {
    const { email, password } = payload;
    const response: LoginResponse = yield call(loginApi, { email, password });
    // Save to localStorage
    const { access_token, refresh_token } = response;

    yield localStorage.setItem('access_token', 'Bearer' + access_token);
    yield localStorage.setItem('refresh_token', refresh_token);

    // Set access token to Auth header
    setAuthToken(access_token);

    // Set current user
    yield put(getCurrentUser());
    history.push('/');
  } catch (error) {
    yield put(loginUserError(error.response.data));
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(AUTH_ACTIONS.LOGIN, loginUserSaga);
}
