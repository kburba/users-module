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
} from '../actions/types';
import { Language } from './languageTypes';

export interface ServiceForm {
    _id?: string;
    type: 'proofreading' | 'translation' | 'editing';
    from: string;
    to: string;
    price: string;
}

export interface Service {
    _id: string;
    type: 'proofreading' | 'translation' | 'editing';
    from: Language;
    to: Language;
    price: number;
}

export type ServiceActions = Get | Add | Update | Delete | Set;

type Set = SetServicesModal;
export type SetServicesModal = {
    type: typeof SERVICES_MODAL_ISOPEN;
    status: boolean;
};

export type GetServicesAction = {
    type: typeof GET_SERVICES;
};

export interface GetServicesSuccessAction {
    type: typeof GET_SERVICES_SUCCESS;
    payload: Service[];
}

export interface GetServicesErrorAction {
    type: typeof GET_SERVICES_ERROR;
    error: any;
}

type Get = GetServicesAction | GetServicesSuccessAction | GetServicesErrorAction;

export interface UpdateServiceAction {
    type: typeof UPDATE_SERVICE;
    payload: ServiceForm;
}

export interface UpdateServiceSuccessAction {
    type: typeof UPDATE_SERVICE_SUCCESS;
    payload: Service;
}

export interface UpdateServiceErrorAction {
    type: typeof UPDATE_SERVICE_ERROR;
    error: any;
}
type Update = UpdateServiceAction | UpdateServiceSuccessAction | UpdateServiceErrorAction;

export interface AddServiceAction {
    type: typeof ADD_SERVICE;
    payload: ServiceForm;
}

export interface AddServiceSuccessAction {
    type: typeof ADD_SERVICE_SUCCESS;
    payload: Service;
}
export interface AddServiceErrorAction {
    type: typeof ADD_SERVICE_ERROR;
    error: any;
}

type Add = AddServiceAction | AddServiceSuccessAction | AddServiceErrorAction;

export interface DeleteServiceAction {
    type: typeof DELETE_SERVICE;
    payload: string;
}
export interface DeleteServiceSuccessAction {
    type: typeof DELETE_SERVICE_SUCCESS;
    payload: string;
}

export interface DeleteServiceErrorAction {
    type: typeof DELETE_SERVICE_ERROR;
    error: any;
}

type Delete = DeleteServiceAction | DeleteServiceSuccessAction | DeleteServiceErrorAction;
