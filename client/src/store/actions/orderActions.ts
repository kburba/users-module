import {
  ORDERS_MODAL_ISOPEN,
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  GET_ORDER_BY_ID_STARTED,
  GET_ORDER_BY_ID_SUCCEED,
  GET_ORDER_BY_ID_FAILED,
} from './types';
import {
  OrderActions,
  Order,
  NewOrder,
  UpdatedOrder,
  GetOrderById,
  GetOrderByIdSucceed,
  GetOrderByIdFailed,
} from '../types/orderTypes';

export function setOrdersModal(status: boolean): OrderActions {
  return {
    type: ORDERS_MODAL_ISOPEN,
    status,
  };
}

export function updateOrderAction(service: UpdatedOrder): OrderActions {
  return {
    type: UPDATE_ORDER,
    payload: service,
  };
}

export function updateOrderSuccessAction(service: Order): OrderActions {
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload: service,
  };
}

export function updateOrderErrorAction(error: any): OrderActions {
  return {
    type: UPDATE_ORDER_ERROR,
    error,
  };
}

export function addOrderAction(data: NewOrder): OrderActions {
  return {
    type: ADD_ORDER,
    payload: data,
  };
}

export function addOrderSuccessAction(service: Order): OrderActions {
  return {
    type: ADD_ORDER_SUCCESS,
    payload: service,
  };
}

export function addOrderErrorAction(error: any): OrderActions {
  return {
    type: ADD_ORDER_ERROR,
    error,
  };
}

export function deleteOrderAction(id: string): OrderActions {
  return { type: DELETE_ORDER, payload: id };
}

export function deleteOrdersSuccessAction(id: string): OrderActions {
  return { type: DELETE_ORDER_SUCCESS, payload: id };
}

export function deleteOrderErrorAction(error: string): OrderActions {
  return { type: DELETE_ORDER_ERROR, error };
}

export function getOrdersAction(): OrderActions {
  return { type: GET_ORDERS };
}

export function getOrdersSuccessAction(services: Order[]): OrderActions {
  return { type: GET_ORDERS_SUCCESS, payload: services };
}

export function getOrdersErrorAction(error: any): OrderActions {
  return { type: GET_ORDERS_ERROR, error };
}

export function getOrderById(id: string): GetOrderById {
  return {
    type: GET_ORDER_BY_ID_STARTED,
    payload: id,
  };
}
export function getOrderByIdSucceed(order: Order): GetOrderByIdSucceed {
  return {
    type: GET_ORDER_BY_ID_SUCCEED,
    payload: order,
  };
}
export function getOrderByIdFailed(error: string): GetOrderByIdFailed {
  return {
    type: GET_ORDER_BY_ID_FAILED,
    error,
  };
}
