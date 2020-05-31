import moment from 'moment';
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
} from '../actions/types';
import { Service } from './serviceTypes';
import { Client } from './clientTypes';

export interface OrdersContainerProps {
  getOrders(): void;
  isLoading: boolean;
  orders: Order[];
  error: string | null;
}

export interface OrdersModalProps {
  setModal(status: boolean): void;
  updateOrder(service: UpdatedOrder): void;
  addOrder(service: NewOrder): void;
  modalIsOpen: boolean;
  isSubmitting: boolean;
  initialValues: Order | null;
  orders: Order[];
}

export interface OrdersTableProps {
  orders: Order[];
}

export type NewOrder = {
  details: OrderDetails;
  services: {
    service: string;
    price: number;
  }[];
  client: string;
  total: number;
  comments?: string;
  status?: string;
};

export type UpdatedOrder = {
  _id: string;
  name: string;
  services: string[];
};

interface OrderDetails {
  name: string;
  orderId: string;
}

interface OrderService {
  _id: string;
  service: Service;
  customPrice?: number;
  pagesQty?: number;
  totalPrice?: number;
}

export interface Order {
  _id: string;
  details: OrderDetails;
  services: OrderService[];
  client: Client;
  createdAt: moment.Moment;
  status?: string;
  comments?: string;
  total: number;
}

export type OrderActions =
  | Get
  | GetById
  | Add
  | Update
  | Delete
  | SetOrdersModal;

export type SetOrdersModal = {
  type: typeof ORDERS_MODAL_ISOPEN;
  status: boolean;
};

export type GetOrderById = {
  type: typeof GET_ORDER_BY_ID_STARTED;
  payload: string;
};
export type GetOrderByIdSucceed = {
  type: typeof GET_ORDER_BY_ID_SUCCEED;
  payload: Order;
};
export type GetOrderByIdFailed = {
  type: typeof GET_ORDER_BY_ID_FAILED;
  error: string;
};

type GetById = GetOrderById | GetOrderByIdSucceed | GetOrderByIdFailed;

export type GetOrdersAction = {
  type: typeof GET_ORDERS;
};

export interface GetOrdersSuccessAction {
  type: typeof GET_ORDERS_SUCCESS;
  payload: Order[];
}

export interface GetOrdersErrorAction {
  type: typeof GET_ORDERS_ERROR;
  error: any;
}

type Get = GetOrdersAction | GetOrdersSuccessAction | GetOrdersErrorAction;

export interface UpdateOrderAction {
  type: typeof UPDATE_ORDER;
  payload: UpdatedOrder;
}

export interface UpdateOrderSuccessAction {
  type: typeof UPDATE_ORDER_SUCCESS;
  payload: Order;
}

export interface UpdateOrderErrorAction {
  type: typeof UPDATE_ORDER_ERROR;
  error: any;
}
type Update =
  | UpdateOrderAction
  | UpdateOrderSuccessAction
  | UpdateOrderErrorAction;

export interface AddOrderAction {
  type: typeof ADD_ORDER;
  payload: NewOrder;
}

export interface AddOrderSuccessAction {
  type: typeof ADD_ORDER_SUCCESS;
  payload: Order;
}
export interface AddOrderErrorAction {
  type: typeof ADD_ORDER_ERROR;
  error: any;
}

type Add = AddOrderAction | AddOrderSuccessAction | AddOrderErrorAction;

export interface DeleteOrderAction {
  type: typeof DELETE_ORDER;
  payload: string;
}
export interface DeleteOrderSuccessAction {
  type: typeof DELETE_ORDER_SUCCESS;
  payload: string;
}

export interface DeleteOrderErrorAction {
  type: typeof DELETE_ORDER_ERROR;
  error: any;
}

type Delete =
  | DeleteOrderAction
  | DeleteOrderSuccessAction
  | DeleteOrderErrorAction;
