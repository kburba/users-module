/* eslint-disable camelcase */
import Axios, { AxiosRequestConfig } from 'axios'
import { logoutUser } from './actions/authActions'
import setAuthToken from '../utils/setAuthToken'
import { LoginRequest } from './types/authTypes'
import { store } from '../App'

export function loginApi(authParams: LoginRequest): Promise<any> {
  return Axios.post('/api/auth/login', authParams)
    .then((response) => response.data)
    .catch((errors) => {
      throw errors
    })
}

export function apiFetch(
  url: string,
  otherParams?: AxiosRequestConfig
): Promise<any> {
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
        const refresh_token = localStorage.getItem('refresh_token')
        return Axios.post('/api/auth/refresh-token', {
          refresh_token,
        })
          .then((res) => {
            // handle new token
            const { access_token } = res.data
            localStorage.setItem('access_token', access_token)
            setAuthToken(access_token)
            return Axios.request({
              url,
              method: otherParams ? otherParams.method : 'GET',
              data: otherParams ? otherParams.data : null,
            })
              .then((res2) => res2)
              .catch(() => {
                store.dispatch(logoutUser())
                throw new Error('unauthorised')
              })
          })
          .catch(() => {
            store.dispatch(logoutUser())
            throw new Error('unauthorised')
          })
      }
      throw errors
    })
}
