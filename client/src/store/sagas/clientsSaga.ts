import { takeLatest, put, call, select } from 'redux-saga/effects';
import {
  GET_CLIENTS,
  ADD_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
  GET_CLIENT_BY_ID,
} from '../actions/types';
import { getClientsIsLoadedFromState, clientsFromState } from './selectors';
import {
  getClientsSuccessAction,
  getClientsErrorAction,
  addClientSuccessAction,
  addClientErrorAction,
  deleteClientsSuccessAction,
  deleteClientErrorAction,
  updateClientSuccessAction,
  updateClientErrorAction,
  getClientByIdSuccess,
  getClientByIdError,
} from '../actions/clientActions';
import {
  AddClient,
  DeleteClient,
  UpdateClientAction,
  GetClientById,
} from '../types/clientTypes';
import { apiFetch } from '../storeUtils';

function* getClientByIdSaga({ payload }: GetClientById) {
  try {
    const response = yield call(apiFetch, `/api/clients/${payload}`);
    yield put(getClientByIdSuccess(response.data));
  } catch (error) {
    yield put(getClientByIdError(error.message));
  }
}

function* updateClientSaga({ payload }: UpdateClientAction) {
  try {
    const { _id, ...Client } = payload;
    const updatedClient = yield call(apiFetch, `/api/clients/${_id}`, {
      method: 'PUT',
      data: Client,
    });
    yield put(updateClientSuccessAction(updatedClient.data));
  } catch (error) {
    yield put(updateClientErrorAction(error.response.data));
  }
}

function* deleteClientSaga({ payload }: DeleteClient) {
  try {
    yield call(apiFetch, `/api/clients/${payload}`, {
      method: 'DELETE',
    });
    yield put(deleteClientsSuccessAction(payload));
  } catch (error) {
    yield put(deleteClientErrorAction(error.message));
  }
}

function* addClientSaga({ payload }: AddClient) {
  try {
    const response = yield call(apiFetch, '/api/clients', {
      method: 'POST',
      data: payload,
    });
    yield put(addClientSuccessAction(response.data));
  } catch (error) {
    put(addClientErrorAction(error.response.data));
  }
}

function* getClientsSaga() {
  try {
    const isLoaded = yield select(getClientsIsLoadedFromState);
    if (isLoaded) {
      const clientsFromCache = yield select(clientsFromState);
      yield put(getClientsSuccessAction(clientsFromCache));
    } else {
      const clients = yield call(apiFetch, '/api/clients');
      yield put(getClientsSuccessAction(clients.data));
    }
  } catch (error) {
    yield put(getClientsErrorAction(error.message));
  }
}

export default function* clientsWatcherSaga() {
  yield takeLatest(ADD_CLIENT, addClientSaga);
  yield takeLatest(DELETE_CLIENT, deleteClientSaga);
  yield takeLatest(GET_CLIENTS, getClientsSaga);
  yield takeLatest(GET_CLIENT_BY_ID, getClientByIdSaga);
  yield takeLatest(UPDATE_CLIENT, updateClientSaga);
}
