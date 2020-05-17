/** rootSaga.js */
import { all, fork } from 'redux-saga/effects';
import languagesSaga from './languagesSaga';
import authSaga from './authSaga';
import serviceSaga from './servicesSaga';
import ordersSaga from './ordersSaga';
import clientsSaga from './clientsSaga';

// import watchers from other files
export default function* rootSaga() {
  yield all([
    fork(languagesSaga),
    fork(authSaga),
    fork(serviceSaga),
    fork(ordersSaga),
    fork(clientsSaga),
  ]);
}
