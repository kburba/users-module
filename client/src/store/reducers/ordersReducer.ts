import {
  ORDERS_MODAL_ISOPEN,
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  ADD_ORDER_ERROR,
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER,
  DELETE_ORDER_ERROR,
  GET_ORDER_BY_ID_STARTED,
  GET_ORDER_BY_ID_SUCCEED,
  GET_ORDER_BY_ID_FAILED,
  ORDER_IS_EDITING,
} from '../actions/types';
import { Order, OrderActions } from '../types/orderTypes';

export type OrdersState = {
  error: null | string | { message: string };
  isDeleting: boolean;
  isEditingOrder: boolean;
  isLoadedOrders: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  modalIsOpen: boolean;
  orderById: Order | null;
  orders: Order[];
};

const initialState: OrdersState = {
  error: null,
  isDeleting: false,
  isEditingOrder: false,
  isLoadedOrders: false,
  isLoading: false,
  isSubmitting: false,
  modalIsOpen: false,
  orderById: null,
  orders: [],
};

export default (state = initialState, action: OrderActions): OrdersState => {
  switch (action.type) {
    case ORDER_IS_EDITING: {
      return {
        ...state,
        isEditingOrder: action.payload,
      };
    }
    case GET_ORDER_BY_ID_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ORDER_BY_ID_SUCCEED:
      return {
        ...state,
        isLoading: false,
        orderById: action.payload,
      };
    case ADD_ORDER:
    case UPDATE_ORDER:
      return {
        ...state,
        isSubmitting: true,
      };
    case ADD_ORDER_SUCCESS: {
      const updatedOrders = [...state.orders];
      updatedOrders.unshift(action.payload);
      return {
        ...state,
        isSubmitting: false,
        modalIsOpen: false,
        error: null,
        orders: updatedOrders,
      };
    }
    case UPDATE_ORDER_SUCCESS: {
      const updatedOrders = state.orders.map((order) => {
        if (order._id === action.payload._id) {
          return action.payload;
        }
        return order;
      });
      return {
        ...state,
        isSubmitting: false,
        orders: updatedOrders,
        modalIsOpen: false,
      };
    }
    case ORDERS_MODAL_ISOPEN:
      return {
        ...state,
        modalIsOpen: action.status,
      };
    case DELETE_ORDER:
      return {
        ...state,
        isDeleting: true,
      };
    case DELETE_ORDER_SUCCESS: {
      const filteredOrders = state.orders.filter(
        (order) => order._id !== action.payload
      );
      return {
        ...state,
        isDeleting: false,
        orders: filteredOrders,
        error: null,
      };
    }
    case GET_ORDERS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
        isLoadedOrders: true,
        error: null,
      };
    case ADD_ORDER_ERROR:
    case UPDATE_ORDER_ERROR:
    case DELETE_ORDER_ERROR:
    case GET_ORDER_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isDeleting: false,
        isSubmitting: false,
        error: action.error,
      };
    case GET_ORDERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
