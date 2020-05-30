import { takeLatest, put, call, select } from 'redux-saga/effects';
import {
  AddServiceAction,
  UpdateServiceAction,
  DeleteServiceAction,
} from '../types/serviceTypes';
import {
  addServiceSuccessAction,
  addServiceErrorAction,
  updateServiceSuccessAction,
  updateServiceErrorAction,
  deleteServicesSuccessAction,
  deleteServiceErrorAction,
  getServicesSuccessAction,
  getServicesErrorAction,
} from '../actions/serviceActions';
import {
  ADD_SERVICE,
  UPDATE_SERVICE,
  GET_SERVICES,
  DELETE_SERVICE,
} from '../actions/types';
import {
  getServicesFromState,
  getServicesIsLoadedFromState,
} from './selectors';
import { resetLoadingCell } from '../actions/variousActions';
import { apiFetch } from '../storeUtils';

function* addServiceSaga({ payload }: AddServiceAction) {
  try {
    const response = yield call(apiFetch, '/api/services', {
      method: 'POST',
      data: payload,
    });
    yield put(addServiceSuccessAction(response.data));
  } catch (error) {
    put(addServiceErrorAction(error.response.data));
  }
}

function* updateServiceSaga({ payload }: UpdateServiceAction) {
  try {
    const { _id, ...service } = payload;
    const updatedService = yield call(apiFetch, `/api/services/${_id}`, {
      method: 'PUT',
      data: service,
    });
    yield put(updateServiceSuccessAction(updatedService.data));
  } catch (error) {
    put(updateServiceErrorAction(error.response.data));
  }
}

function* deleteServiceSaga({ payload }: DeleteServiceAction) {
  try {
    yield call(apiFetch, `/api/services/${payload}`, {
      method: 'DELETE',
    });
    yield put(deleteServicesSuccessAction(payload));
    yield put(resetLoadingCell());
  } catch (error) {
    yield put(deleteServiceErrorAction(error.message));
  }
}

function* getServicesSaga() {
  try {
    const isLoaded = yield select(getServicesIsLoadedFromState);
    if (isLoaded) {
      const servicesFromState = yield select(getServicesFromState);
      yield put(getServicesSuccessAction(servicesFromState));
    } else {
      const services = yield call(apiFetch, '/api/services');
      yield put(getServicesSuccessAction(services.data));
    }
  } catch (error) {
    yield put(getServicesErrorAction(error.message));
  }
}

export default function* servicesWatcherSaga() {
  yield takeLatest(ADD_SERVICE, addServiceSaga);
  yield takeLatest(UPDATE_SERVICE, updateServiceSaga);
  yield takeLatest(GET_SERVICES, getServicesSaga);
  yield takeLatest(DELETE_SERVICE, deleteServiceSaga);
}
