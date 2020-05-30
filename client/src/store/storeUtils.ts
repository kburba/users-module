import Axios, { AxiosRequestConfig } from 'axios';
import store from './store';
import { logoutUser } from './actions/authActions';
import setAuthToken from '../utils/setAuthToken';

export function loginApi(authParams) {
  return Axios.post('/api/users/login', authParams)
    .then((response) => response)
    .catch((errors) => {
      throw errors;
    });
}

export function apiFetch(url: string, otherParams?: AxiosRequestConfig) {
  // TODO handle different HTTP methods (post, put, patch, delete)
  return Axios.request({
    url,
    method: otherParams ? otherParams.method : 'GET',
    data: otherParams ? otherParams.data : null,
  })
    .then((response) => response)
    .catch((errors) => {
      console.log('errors', errors);
      if (errors.response.status === 401) {
        const user = store.getState().auth.user;
        const refreshToken = localStorage.getItem('refreshToken');
        return Axios.post('/api/users/token', {
          refreshToken,
          user,
        })
          .then((res) => {
            // handle new token
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            return Axios.request({
              url,
              method: otherParams ? otherParams.method : 'GET',
              data: otherParams ? otherParams.data : null,
            })
              .then((res2) => res2)
              .catch((err2) => {
                store.dispatch(logoutUser());
                throw new Error('unauthorised');
              });
          })
          .catch((err) => {
            // handle token error
          });
      }
      throw errors;
    });
}
