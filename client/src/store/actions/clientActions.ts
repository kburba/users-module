import {
    ClientsActions,
    Client,
    ClientForm,
    AddClient,
    DeleteClient,
    GetClientById,
    GetClientByIdSuccess,
    GetClientByIdError,
} from '../types/clientTypes';
import {
    GET_CLIENTS,
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_ERROR,
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
    GET_CLIENT_BY_ID_ERROR,
    GET_CLIENT_BY_ID,
    GET_CLIENT_BY_ID_SUCCESS,
} from './types';

export function getClientById(id: string): GetClientById {
    return {
        type: GET_CLIENT_BY_ID,
        payload: id,
    };
}

export function getClientByIdSuccess(client: Client): GetClientByIdSuccess {
    return {
        type: GET_CLIENT_BY_ID_SUCCESS,
        payload: client,
    };
}

export function getClientByIdError(error: string): GetClientByIdError {
    return {
        type: GET_CLIENT_BY_ID_ERROR,
        error,
    };
}

export function updateClientAction(service: ClientForm): ClientsActions {
    return {
        type: UPDATE_CLIENT,
        payload: service,
    };
}

export function updateClientSuccessAction(service: Client): ClientsActions {
    return {
        type: UPDATE_CLIENT_SUCCESS,
        payload: service,
    };
}

export function updateClientErrorAction(error: any): ClientsActions {
    return {
        type: UPDATE_CLIENT_ERROR,
        error,
    };
}

export function deleteClientAction(id: string): DeleteClient {
    return { type: DELETE_CLIENT, payload: id };
}

export function deleteClientsSuccessAction(id: string): ClientsActions {
    return { type: DELETE_CLIENT_SUCCESS, payload: id };
}

export function deleteClientErrorAction(error: string): ClientsActions {
    return { type: DELETE_CLIENT_ERROR, error };
}

export function addClientAction(newClient: ClientForm): AddClient {
    return {
        type: ADD_CLIENT,
        payload: newClient,
    };
}

export function addClientSuccessAction(newClient: Client): ClientsActions {
    return {
        type: ADD_CLIENT_SUCCESS,
        payload: newClient,
    };
}

export function addClientErrorAction(error: string): ClientsActions {
    return { type: ADD_CLIENT_ERROR, error };
}

export function getClientsAction(): ClientsActions {
    return { type: GET_CLIENTS };
}

export function getClientsSuccessAction(clients: Client[]): ClientsActions {
    return { type: GET_CLIENTS_SUCCESS, payload: clients };
}

export function getClientsErrorAction(error: any): ClientsActions {
    return { type: GET_CLIENTS_ERROR, error };
}

export function setClientsModal(status: boolean): ClientsActions {
    return {
        type: CLIENTS_MODAL_ISOPEN,
        payload: status,
    };
}

export function setClientEditingId(id: string): ClientsActions {
    return {
        type: SET_CLIENT_EDITING_ID,
        payload: id,
    };
}
