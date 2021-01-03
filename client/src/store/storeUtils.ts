import Axios, { AxiosRequestConfig } from 'axios';
import store from './store';
import { logoutUser } from './actions/authActions';
import setAuthToken from '../utils/setAuthToken';

export function loginApi(authParams) {
  return Axios.post('/api/auth/login', authParams)
    .then((response) => response.data)
    .catch((errors) => {
      throw errors;
    });
}

export function apiFetch(url: string, otherParams?: AxiosRequestConfig) {
  // TODO handle different HTTP methods (post, put, patch, delete)
  return Axios.request({
    url,
    headers: {
      'Cache-Control': 'no-cache',
    },
    method: otherParams ? otherParams.method : 'GET',
    data: otherParams ? otherParams.data : null,
  })
    .then((response) => response)
    .catch((errors) => {
      if (errors.response.status === 401) {
        const refresh_token = localStorage.getItem('refresh_token');
        return Axios.post('/api/auth/refresh-token', {
          refresh_token,
        })
          .then((res) => {
            // handle new token
            const { access_token } = res.data;
            localStorage.setItem('access_token', access_token);
            setAuthToken(access_token);
            return Axios.request({
              url,
              method: otherParams ? otherParams.method : 'GET',
              data: otherParams ? otherParams.data : null,
            })
              .then((res2) => res2)
              .catch(() => {
                store.dispatch(logoutUser());
                throw new Error('unauthorised');
              });
          })
          .catch(() => {
            store.dispatch(logoutUser());
            throw new Error('unauthorised');
          });
      }
      throw errors;
    });
}
