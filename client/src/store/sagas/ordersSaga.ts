import { takeLatest, put, call, select } from 'redux-saga/effects';
import { history } from '../../App';
import {
  AddOrderAction,
  UpdateOrderAction,
  DeleteOrderAction,
  GetOrderById,
  Order,
} from '../types/orderTypes';
import {
  addOrderSuccessAction,
  addOrderErrorAction,
  updateOrderSuccessAction,
  updateOrderErrorAction,
  deleteOrdersSuccessAction,
  deleteOrderErrorAction,
  getOrdersSuccessAction,
  getOrdersErrorAction,
  getOrderByIdSucceed,
} from '../actions/orderActions';
import {
  ADD_ORDER,
  UPDATE_ORDER,
  GET_ORDERS,
  DELETE_ORDER,
  GET_ORDER_BY_ID_STARTED,
} from '../actions/types';
import { resetLoadingCell } from '../actions/variousActions';
import {
  getOrdersIsLoadedFromState,
  getOrdersFromState,
  orderFromState,
} from './selectors';
import { apiFetch } from '../storeUtils';

function* addOrderSaga({ payload }: AddOrderAction) {
  try {
    const response = yield call(apiFetch, '/api/orders', {
      method: 'POST',
      data: payload,
    });
    yield put(addOrderSuccessAction(response.data));
    history.push('/orders');
  } catch (error) {
    yield put(addOrderErrorAction(error.response.data));
  }
}

function* updateOrderSaga({ payload }: UpdateOrderAction) {
  try {
    const { _id, ...order } = payload;
    const updatedOrder = yield call(apiFetch, `/api/orders/${_id}`, {
      method: 'PUT',
      data: order,
    });
    yield put(updateOrderSuccessAction(updatedOrder.data));
  } catch (error) {
    yield put(updateOrderErrorAction(error.response.data));
  }
}

function* deleteOrderSaga({ payload }: DeleteOrderAction) {
  try {
    yield call(apiFetch, `/api/orders/${payload}`);
    yield put(deleteOrdersSuccessAction(payload));
    yield put(resetLoadingCell());
  } catch (error) {
    yield put(deleteOrderErrorAction(error.response.data.error));
  }
}

function* getOrderByIdSaga({ payload }: GetOrderById) {
  try {
    const ordersFromCache: Order[] = yield select(orderFromState);
    const orderFromCache = ordersFromCache.find((x) => x._id === payload);
    if (ordersFromCache && orderFromCache) {
      yield put(getOrderByIdSucceed(orderFromCache));
    } else {
      const order = yield call(apiFetch, `/api/orders/${payload}`);
      yield put(getOrderByIdSucceed(order.data));
    }
  } catch (error) {
    console.log('error', error);
    yield put(getOrdersErrorAction(error.message));
  }
}
function* getOrdersSaga() {
  try {
    const isLoaded = yield select(getOrdersIsLoadedFromState);
    if (isLoaded) {
      const ordersFromState = yield select(getOrdersFromState);
      yield put(getOrdersSuccessAction(ordersFromState));
    } else {
      const orders = yield call(apiFetch, '/api/orders');
      yield put(getOrdersSuccessAction(orders.data));
    }
  } catch (error) {
    console.log('error', error);
    yield put(getOrdersErrorAction(error.message));
  }
}

export default function* ordersWatcherSaga() {
  yield takeLatest(ADD_ORDER, addOrderSaga);
  yield takeLatest(DELETE_ORDER, deleteOrderSaga);
  yield takeLatest(GET_ORDERS, getOrdersSaga);
  yield takeLatest(GET_ORDER_BY_ID_STARTED, getOrderByIdSaga);
  yield takeLatest(UPDATE_ORDER, updateOrderSaga);
}
