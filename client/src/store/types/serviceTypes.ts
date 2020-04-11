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
  DELETE_SERVICE_ERROR
} from "../actions/types";
import { Language } from "./languageTypes";

// export interface ServicesContainerProps {
//   getServices(): void;
//   setModal(status: boolean): void;
//   modalIsOpen: boolean;
//   isLoading: boolean;
// }

// export interface ServicesModalProps {
//   setModal(status: boolean): void;
//   updateService(service: UpdatedService): void;
//   addService(service: NewService): void;
//   modalIsOpen: boolean;
//   isSubmitting: boolean;
//   initialValues: Service | null;
//   services: Service[];
// }

// export interface ServicesTableProps {
//   deleteService(id: string): void;
//   setModal(status: boolean): void;
//   services: Service[];
//   isLoading: boolean;
//   setisEditing: React.Dispatch<React.SetStateAction<Service | null>>;
// }

export interface NewService {
  type: string;
  from: string;
  to: string;
  price: number;
};

export interface UpdatedService extends NewService {
  _id: string;
};

export interface Service {
  _id: string;
  type: string;
  from: Language;
  to: Language;
  price: number;
}

export type ServiceActions = Get | Add | Update | Delete | SetServicesModal;

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

type Get =
  | GetServicesAction
  | GetServicesSuccessAction
  | GetServicesErrorAction;

export interface UpdateServiceAction {
  type: typeof UPDATE_SERVICE;
  payload: UpdatedService;
}

export interface UpdateServiceSuccessAction {
  type: typeof UPDATE_SERVICE_SUCCESS;
  payload: UpdatedService;
}

export interface UpdateServiceErrorAction {
  type: typeof UPDATE_SERVICE_ERROR;
  error: any;
}
type Update =
  | UpdateServiceAction
  | UpdateServiceSuccessAction
  | UpdateServiceErrorAction;

export interface AddServiceAction {
  type: typeof ADD_SERVICE;
  payload: NewService;
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

type Delete =
  | DeleteServiceAction
  | DeleteServiceSuccessAction
  | DeleteServiceErrorAction;
