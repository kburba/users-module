import {
    SERVICES_MODAL_ISOPEN,
    UPDATE_SERVICE,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_ERROR,
    ADD_SERVICE,
    ADD_SERVICE_SUCCESS,
    ADD_SERVICE_ERROR,
    DELETE_SERVICE,
    DELETE_SERVICE_ERROR,
    DELETE_SERVICE_SUCCESS,
    GET_SERVICES,
    GET_SERVICES_SUCCESS,
    GET_SERVICES_ERROR,
    SET_SERVICES_EDITING_ID,
} from './types';
import { ServiceActions, Service, ServiceForm } from '../types/serviceTypes';

export function setServicesModal(status: boolean): ServiceActions {
    return {
        type: SERVICES_MODAL_ISOPEN,
        status,
    };
}

export function updateServiceAction(service: ServiceForm): ServiceActions {
    return {
        type: UPDATE_SERVICE,
        payload: service,
    };
}

export function updateServiceSuccessAction(service: Service): ServiceActions {
    return {
        type: UPDATE_SERVICE_SUCCESS,
        payload: service,
    };
}

export function updateServiceErrorAction(error: any): ServiceActions {
    return {
        type: UPDATE_SERVICE_ERROR,
        error,
    };
}

export function addServiceAction(service: ServiceForm): ServiceActions {
    return {
        type: ADD_SERVICE,
        payload: service,
    };
}

export function addServiceSuccessAction(service: Service): ServiceActions {
    return {
        type: ADD_SERVICE_SUCCESS,
        payload: service,
    };
}

export function addServiceErrorAction(error: any): ServiceActions {
    return {
        type: ADD_SERVICE_ERROR,
        error,
    };
}

export function deleteServiceAction(id: string): ServiceActions {
    return { type: DELETE_SERVICE, payload: id };
}

export function deleteServicesSuccessAction(id: string): ServiceActions {
    return { type: DELETE_SERVICE_SUCCESS, payload: id };
}

export function deleteServiceErrorAction(error: string): ServiceActions {
    return { type: DELETE_SERVICE_ERROR, error };
}

export function getServicesAction(): ServiceActions {
    return { type: GET_SERVICES };
}

export function getServicesSuccessAction(services: Service[]): ServiceActions {
    return { type: GET_SERVICES_SUCCESS, payload: services };
}

export function getServicesErrorAction(error: any): ServiceActions {
    return { type: GET_SERVICES_ERROR, error };
}

export function setServicesEditingId(id: string): ServiceActions {
    return {
        type: SET_SERVICES_EDITING_ID,
        payload: id,
    };
}
