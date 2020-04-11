import { takeLatest, put, call } from 'redux-saga/effects';
// import { customHistory } from '../../App';
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

function* addOrderSaga({ payload }: AddOrderAction) {
    try {
        const response = yield call(Axios.post, '/api/orders', payload);
        // const history = customHistory;
        // history.push('/orders');
        yield put(addOrderSuccessAction(response.data));
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
    } catch (error) {
        yield put(deleteOrderErrorAction(error.response.data.error));
    }
}

function* getOrdersSaga() {
    try {
        const orders = yield call(Axios.get, '/api/orders');
        yield put(getOrdersSuccessAction(orders.data));
    } catch (error) {
        yield put(getOrdersErrorAction(error.message));
    }
}

export default function* ordersWatcherSaga() {
    yield takeLatest(ADD_ORDER, addOrderSaga);
    yield takeLatest(UPDATE_ORDER, updateOrderSaga);
    yield takeLatest(GET_ORDERS, getOrdersSaga);
    yield takeLatest(DELETE_ORDER, deleteOrderSaga);
}