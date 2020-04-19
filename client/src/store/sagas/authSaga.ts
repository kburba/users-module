import { takeLatest, put } from 'redux-saga/effects';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import { LOGIN_USER } from '../actions/types';
import { setCurrentUser, loginUserError } from '../actions/authActions';
import setAuthToken from '../../utils/setAuthToken';
import { history } from '../../App';

interface LoginUserType {
    type: typeof LOGIN_USER;
    payload: { email: string; password: string };
}

function* loginUserSaga({ payload }: LoginUserType) {
    try {
        const { email, password } = payload;
        const loginData = yield Axios.post('/api/users/login', { email, password });

        // Save to localStorage
        const { token } = loginData.data;

        yield localStorage.setItem('jwtToken', token);

        // Set token to Auth header
        setAuthToken(token);

        // Decode token to get user data
        const decoded = jwt_decode(token);

        // Set current user
        yield put(setCurrentUser(decoded));
        history.push('/orders');
    } catch (error) {
        yield put(loginUserError(error.response.data));
    }
}

export default function* authWatcherSaga() {
    yield takeLatest(LOGIN_USER, loginUserSaga);
}
