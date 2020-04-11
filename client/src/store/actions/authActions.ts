import setAuthToken from '../../utils/setAuthToken';
import { AuthActions } from './../types/authTypes';
import axios from 'axios';
// import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, LOGIN_USER, LOGIN_USER_ERROR, LOGOUT_USER } from './types';
// Register user
export const registerUser = (userData, history) => (dispatch) => {
    axios
        .post('/api/users/register', userData)
        .then((res) => history.push('/login'))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// Login registered user
export function loginUser(userData: { email: string; password: string }): AuthActions {
    return {
        type: LOGIN_USER,
        payload: userData,
    };
}

export function loginUserSuccess() {}

export function loginUserError(errors: { email?: string }): AuthActions {
    return {
        type: LOGIN_USER_ERROR,
        errors,
    };
}

// Set logged user
export function setCurrentUser(decoded): AuthActions {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
}

// Logout user
export function logoutUser(): AuthActions {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');

    // Delete auth token
    setAuthToken(null);

    // set current user to empty object
    setCurrentUser({});

    return {
        type: LOGOUT_USER,
    };
}
