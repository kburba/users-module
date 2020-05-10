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
} from '../actions/types';
import { Order } from '../types/orderTypes';

export type OrdersState = {
    error: null | string | { message: string };
    isDeleting: boolean;
    isLoadedOrders: boolean;
    isLoading: boolean;
    isSubmitting: boolean;
    modalIsOpen: boolean;
    orders: Order[];
};

const initialState: OrdersState = {
    error: null,
    isDeleting: false,
    isLoadedOrders: false,
    isLoading: false,
    isSubmitting: false,
    modalIsOpen: false,
    orders: [],
};

export default (state = initialState, action): OrdersState => {
    switch (action.type) {
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
            const filteredOrders = state.orders.filter((order) => order._id !== action.payload);
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
            return {
                ...state,
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
