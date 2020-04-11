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
import { Service } from "../types/serviceTypes";

export type ServicesState = {
  services: Service[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: any;
  modalIsOpen: boolean;
};

const initialState: ServicesState = {
  services: [],
  isLoading: false,
  isSubmitting: false,
  error: null,
  modalIsOpen: false
};

export default (state = initialState, action): ServicesState => {
  switch (action.type) {
    case ADD_SERVICE:
    case UPDATE_SERVICE:
      return {
        ...state,
        isSubmitting: true
      };
    case ADD_SERVICE_SUCCESS: {
      const updatedServices = [...state.services];
      updatedServices.unshift(action.payload);
      return {
        ...state,
        isSubmitting: false,
        modalIsOpen: false,
        error: null,
        services: updatedServices
      };
    }
    case UPDATE_SERVICE_SUCCESS: {
      const updatedServices = state.services.map(service => {
        if (service._id === action.payload._id) {
          // for (const key in action.payload) {
          //   service[key] = action.payload[key];
          // }
          return action.payload;
        }
        return service;
      });
      return {
        ...state,
        isSubmitting: false,
        services: updatedServices,
        modalIsOpen: false
      };
    }
    case SERVICES_MODAL_ISOPEN:
      return {
        ...state,
        modalIsOpen: action.status
      };
    case DELETE_SERVICE:
      return {
        ...state
      };
    case DELETE_SERVICE_SUCCESS: {
      const filteredServices = state.services.filter(
        service => service._id !== action.payload
      );
      return {
        ...state,
        services: filteredServices,
        error: null
      };
    }
    case GET_SERVICES:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload,
        isLoading: false,
        error: null
      };
    case ADD_SERVICE_ERROR:
    case UPDATE_SERVICE_ERROR:
    case DELETE_SERVICE_ERROR:
    case GET_SERVICES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};
