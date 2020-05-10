import { GET_CLIENTS, ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT, GET_CLIENT_BY_ID } from '../actions/types';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getClientsIsLoadedFromState, getClientsFromState } from './selectors';
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
import Axios from 'axios';
import { AddClient, DeleteClient, UpdateClientAction, GetClientById } from '../types/clientTypes';
import { history } from '../../App';

function* getClientByIdSaga({ payload }: GetClientById) {
    try {
        const response = yield call(Axios.get, `/api/clients/${payload}`);
        if (!response.ok && response.code === 401) {
            history.push('/login');
        }
        yield put(getClientByIdSuccess(response.data));
    } catch (error) {
        yield put(getClientByIdError(error.message));
    }
}

function* updateClientSaga({ payload }: UpdateClientAction) {
    try {
        const { _id, ...Client } = payload;
        const updatedClient = yield call(Axios.put, `/api/clients/${_id}`, Client);
        yield put(updateClientSuccessAction(updatedClient.data));
    } catch (error) {
        yield put(updateClientErrorAction(error.response.data));
    }
}

function* deleteClientSaga({ payload }: DeleteClient) {
    try {
        yield call(Axios.delete, `/api/clients/${payload}`);
        yield put(deleteClientsSuccessAction(payload));
    } catch (error) {
        yield put(deleteClientErrorAction(error.message));
    }
}

function* addClientSaga({ payload }: AddClient) {
    try {
        const response = yield call(Axios.post, '/api/clients', payload);
        yield put(addClientSuccessAction(response.data));
    } catch (error) {
        put(addClientErrorAction(error.response.data));
    }
}

function* getClientsSaga() {
    try {
        const isLoaded = yield select(getClientsIsLoadedFromState);
        if (isLoaded) {
            const clientsFromState = yield select(getClientsFromState);
            yield put(getClientsSuccessAction(clientsFromState));
        } else {
            const clients = yield call(Axios.get, '/api/clients');
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
