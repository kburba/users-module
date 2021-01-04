/** rootSaga.js */
import { all, fork } from 'redux-saga/effects'
import watchAuthSaga from './authSaga'
import watchUsersSaga from './usersSaga'

// import watchers from other files
export default function* rootSaga() {
  yield all([fork(watchAuthSaga), fork(watchUsersSaga)])
}
