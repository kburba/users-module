import {
    SERVICES_MODAL_ISOPEN,
    GET_SERVICES,
    GET_SERVICES_SUCCESS,
    GET_SERVICES_ERROR,
    UPDATE_SERVICE,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_ERROR,
    ADD_SERVICE_ERROR,
    ADD_SERVICE,
    ADD_SERVICE_SUCCESS,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE,
    DELETE_SERVICE_ERROR,
    SET_SERVICES_EDITING_ID,
} from '../actions/types';
import { Service, ServiceActions } from '../types/serviceTypes';

export type ServicesState = {
    error: any;
    isEditingId: string;
    isLoadedServices: boolean;
    isLoading: boolean;
    isSubmitting: boolean;
    modalIsOpen: boolean;
    services: Service[];
};

const initialState: ServicesState = {
    error: null,
    isEditingId: '',
    isLoadedServices: false,
    isLoading: false,
    isSubmitting: false,
    modalIsOpen: false,
    services: [],
};

export default (state = initialState, action: ServiceActions): ServicesState => {
    switch (action.type) {
        case SET_SERVICES_EDITING_ID:
            return {
                ...state,
                isEditingId: action.payload,
            };
        case ADD_SERVICE:
        case UPDATE_SERVICE:
            return {
                ...state,
                isSubmitting: true,
            };
        case ADD_SERVICE_SUCCESS: {
            const updatedServices = [...state.services];
            updatedServices.unshift(action.payload);
            return {
                ...state,
                isSubmitting: false,
                modalIsOpen: false,
                error: null,
                services: updatedServices,
            };
        }
        case UPDATE_SERVICE_SUCCESS: {
            const updatedServices = state.services.map((service) => {
                if (service._id === action.payload._id) {
                    for (const key in action.payload) {
                        service[key] = action.payload[key];
                    }
                    return action.payload;
                }
                return service;
            });
            return {
                ...state,
                isSubmitting: false,
                services: updatedServices,
                modalIsOpen: false,
            };
        }
        case SERVICES_MODAL_ISOPEN:
            return {
                ...state,
                modalIsOpen: action.status,
                isEditingId: action.status === false ? '' : state.isEditingId,
            };
        case DELETE_SERVICE:
            return {
                ...state,
                isLoading: true,
            };
        case DELETE_SERVICE_SUCCESS: {
            const filteredServices = state.services.filter((service) => service._id !== action.payload);
            return {
                ...state,
                isLoading: false,
                services: filteredServices,
                error: null,
            };
        }
        case GET_SERVICES:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case GET_SERVICES_SUCCESS:
            return {
                ...state,
                services: action.payload,
                isLoading: false,
                isLoadedServices: true,
                error: null,
            };
        case ADD_SERVICE_ERROR:
        case UPDATE_SERVICE_ERROR:
        case DELETE_SERVICE_ERROR:
        case GET_SERVICES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
