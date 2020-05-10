import { ClientsState, ClientsActions } from '../types/clientTypes';
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
    SET_CLIENT_EDITING_ID,
    UPDATE_CLIENT,
    UPDATE_CLIENT_SUCCESS,
    GET_CLIENT_BY_ID,
    GET_CLIENT_BY_ID_SUCCESS,
    GET_CLIENT_BY_ID_ERROR,
} from '../actions/types';

const initialState: ClientsState = {
    clientById: null,
    clients: [],
    error: '',
    isDeletingClients: false,
    isEditingId: '',
    isLoadedClients: false,
    isLoadingClients: false,
    isSubmitting: false,
    modalIsOpen: false,
};

export default (state = initialState, action: ClientsActions): ClientsState => {
    switch (action.type) {
        case GET_CLIENT_BY_ID:
            return {
                ...state,
                isLoadingClients: true,
                error: '',
            };
        case GET_CLIENT_BY_ID_SUCCESS:
            return {
                ...state,
                error: '',
                isLoadingClients: false,
                clientById: action.payload,
            };
        case GET_CLIENT_BY_ID_ERROR:
            return {
                ...state,
                isLoadingClients: false,
                error: action.error,
            };
        case SET_CLIENT_EDITING_ID:
            return {
                ...state,
                isEditingId: action.payload,
                error: '',
            };
        case UPDATE_CLIENT:
            return {
                ...state,
                error: '',
                isSubmitting: true,
            };
        case UPDATE_CLIENT_SUCCESS:
            return {
                ...state,
                error: '',
                isSubmitting: false,
                isEditingId: '',
                modalIsOpen: false,
                clients: state.clients.map((client) => {
                    if (client._id === action.payload._id) {
                        return { ...client, ...action.payload };
                    }
                    return client;
                }),
            };
        case DELETE_CLIENT:
            return {
                ...state,
                isDeletingClients: true,
                error: '',
            };
        case DELETE_CLIENT_SUCCESS: {
            return {
                ...state,
                error: '',
                isDeletingClients: false,
                clients: state.clients.filter((client) => client._id !== action.payload),
            };
        }
        case ADD_CLIENT:
            return {
                ...state,
                isSubmitting: true,
                error: '',
            };
        case ADD_CLIENT_SUCCESS:
            return {
                ...state,
                error: '',
                modalIsOpen: false,
                isSubmitting: false,
                clients: [action.payload, ...state.clients],
            };
        case ADD_CLIENT_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case CLIENTS_MODAL_ISOPEN:
            return {
                ...state,
                modalIsOpen: action.payload,
                isEditingId: action.payload === false ? '' : state.isEditingId,
            };
        case GET_CLIENTS:
            return { ...state, isLoadingClients: true, error: '' };
        case GET_CLIENTS_SUCCESS:
            return {
                ...state,
                clients: action.payload,
                error: '',
                isLoadedClients: true,
                isLoadingClients: false,
            };
        case DELETE_CLIENT_ERROR:
        case GET_CLIENTS_ERROR:
            return {
                ...state,
                isDeletingClients: false,
                isLoadingClients: false,
                error: action.error,
            };
        default:
            return state;
    }
};
