import {
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_ERROR,
    GET_CLIENTS,
    CLIENTS_MODAL_ISOPEN,
    ADD_CLIENT,
    ADD_CLIENT_SUCCESS,
    ADD_CLIENT_ERROR,
    DELETE_CLIENT,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_ERROR,
    UPDATE_CLIENT,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_ERROR,
    SET_CLIENT_EDITING_ID,
    GET_CLIENT_BY_ID,
    GET_CLIENT_BY_ID_SUCCESS,
    GET_CLIENT_BY_ID_ERROR,
} from '../actions/types';
import { Order } from './orderTypes';

export type Client = {
    _id: string;
    name: string;
    orders: Order[];
};

export type ClientsState = {
    clientById: null | Client;
    clients: Client[];
    error: string;
    isDeletingClients: boolean;
    isEditingId: string;
    isLoadedClients: boolean;
    isLoadingClients: boolean;
    isSubmitting: boolean;
    modalIsOpen: boolean;
};

export type ClientForm = {
    _id?: string;
    name: string;
};

export type ClientsActions = ADD | GET | DELETE | UPDATE | ClientsModalIsOpen | SetClientEditingId;

type UPDATE = UpdateClientAction | UpdateClientSuccessAction | UpdateClientErrorAction;

export interface UpdateClientAction {
    type: typeof UPDATE_CLIENT;
    payload: ClientForm;
}

export interface UpdateClientSuccessAction {
    type: typeof UPDATE_CLIENT_SUCCESS;
    payload: Client;
}

export interface UpdateClientErrorAction {
    type: typeof UPDATE_CLIENT_ERROR;
    error: string;
}

type DELETE = DeleteClient | DeleteClientSuccess | DeleteClientError;

export interface DeleteClient {
    type: typeof DELETE_CLIENT;
    payload: string;
}

interface DeleteClientSuccess {
    type: typeof DELETE_CLIENT_SUCCESS;
    payload: string;
}

interface DeleteClientError {
    type: typeof DELETE_CLIENT_ERROR;
    error: string;
}

type ADD = AddClient | AddClientSuccess | AddClientError;

export interface AddClient {
    type: typeof ADD_CLIENT;
    payload: ClientForm;
}

interface AddClientSuccess {
    type: typeof ADD_CLIENT_SUCCESS;
    payload: Client;
}

interface AddClientError {
    type: typeof ADD_CLIENT_ERROR;
    error: string;
}

type GET = GetClients | GetClientSuccess | GetClientError | GetClientById | GetClientByIdSuccess | GetClientByIdError;

export interface GetClientById {
    type: typeof GET_CLIENT_BY_ID;
    payload: string;
}

export interface GetClientByIdSuccess {
    type: typeof GET_CLIENT_BY_ID_SUCCESS;
    payload: Client;
}

export interface GetClientByIdError {
    type: typeof GET_CLIENT_BY_ID_ERROR;
    error: string;
}

interface GetClients {
    type: typeof GET_CLIENTS;
}

interface GetClientSuccess {
    type: typeof GET_CLIENTS_SUCCESS;
    payload: Client[];
}

interface GetClientError {
    type: typeof GET_CLIENTS_ERROR;
    error: string;
}

interface ClientsModalIsOpen {
    type: typeof CLIENTS_MODAL_ISOPEN;
    payload: boolean;
}

interface SetClientEditingId {
    type: typeof SET_CLIENT_EDITING_ID;
    payload: string;
}
