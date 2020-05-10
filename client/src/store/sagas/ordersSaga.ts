import { takeLatest, put, call, select } from 'redux-saga/effects';
import { history } from '../../App';
import Axios from 'axios';
import { AddOrderAction, UpdateOrderAction, DeleteOrderAction } from '../types/orderTypes';
import {
    addOrderSuccessAction,
    addOrderErrorAction,
    updateOrderSuccessAction,
    updateOrderErrorAction,
    deleteOrdersSuccessAction,
    deleteOrderErrorAction,
    getOrdersSuccessAction,
    getOrdersErrorAction,
} from '../actions/orderActions';
import { ADD_ORDER, UPDATE_ORDER, GET_ORDERS, DELETE_ORDER } from '../actions/types';
import { resetLoadingCell } from '../actions/variousActions';
import { getOrdersIsLoadedFromState, getOrdersFromState } from './selectors';

function* addOrderSaga({ payload }: AddOrderAction) {
    try {
        const response = yield call(Axios.post, '/api/orders', payload);
        yield put(addOrderSuccessAction(response.data));
        history.push('/orders');
    } catch (error) {
        yield put(addOrderErrorAction(error.response.data));
    }
}

function* updateOrderSaga({ payload }: UpdateOrderAction) {
    try {
        const { _id, ...order } = payload;
        const updatedOrder = yield call(Axios.put, `/api/orders/${_id}`, order);
        yield put(updateOrderSuccessAction(updatedOrder.data));
    } catch (error) {
        yield put(updateOrderErrorAction(error.response.data));
    }
}

function* deleteOrderSaga({ payload }: DeleteOrderAction) {
    try {
        yield call(Axios.delete, `/api/orders/${payload}`);
        yield put(deleteOrdersSuccessAction(payload));
        yield put(resetLoadingCell());
    } catch (error) {
        yield put(deleteOrderErrorAction(error.response.data.error));
    }
}

function* getOrdersSaga() {
    try {
        const isLoaded = yield select(getOrdersIsLoadedFromState);
        if (isLoaded) {
            const ordersFromState = yield select(getOrdersFromState);
            yield put(getOrdersSuccessAction(ordersFromState));
        } else {
            const orders = yield call(Axios.get, '/api/orders');
            yield put(getOrdersSuccessAction(orders.data));
        }
    } catch (error) {
        console.log('error', error);
        yield put(getOrdersErrorAction(error.message));
    }
}

export default function* ordersWatcherSaga() {
    yield takeLatest(ADD_ORDER, addOrderSaga);
    yield takeLatest(UPDATE_ORDER, updateOrderSaga);
    yield takeLatest(GET_ORDERS, getOrdersSaga);
    yield takeLatest(DELETE_ORDER, deleteOrderSaga);
}
