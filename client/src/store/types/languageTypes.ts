import {
  DELETE_LANGUAGE,
  ADD_LANGUAGE,
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_ERROR,
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_LANGUAGE_ERROR,
  GET_LANGUAGES,
  GET_LANGUAGES_ERROR,
  GET_LANGUAGES_SUCCESS,
  DELETE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGE_ERROR,
  LANGUAGES_MODAL_ISOPEN,
} from '../actions/types';

export type Language = {
  _id: string;
  name: string;
  createdAt?: string;
};

export type LanguageActions = Get | Add | Update | Delete | SetLanguagesModal;

export type SetLanguagesModal = {
  type: typeof LANGUAGES_MODAL_ISOPEN;
  status: boolean;
};

export type GetLanguagesAction = {
  type: typeof GET_LANGUAGES;
};

export interface GetLanguagesSuccessAction {
  type: typeof GET_LANGUAGES_SUCCESS;
  payload: Language[];
}

export interface GetLanguagesErrorAction {
  type: typeof GET_LANGUAGES_ERROR;
  error: any;
}

type Get =
  | GetLanguagesAction
  | GetLanguagesSuccessAction
  | GetLanguagesErrorAction;

export interface UpdateLanguageAction {
  type: typeof UPDATE_LANGUAGE;
  payload: Language;
}

export interface UpdateLanguageSuccessAction {
  type: typeof UPDATE_LANGUAGE_SUCCESS;
  payload: Language;
}

export interface UpdateLanguageErrorAction {
  type: typeof UPDATE_LANGUAGE_ERROR;
  error: any;
}
type Update =
  | UpdateLanguageAction
  | UpdateLanguageSuccessAction
  | UpdateLanguageErrorAction;

export interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: string;
}

export interface AddLanguageSuccessAction {
  type: typeof ADD_LANGUAGE_SUCCESS;
  payload: Language;
}
export interface AddLanguageErrorAction {
  type: typeof ADD_LANGUAGE_ERROR;
  error: any;
}

type Add =
  | AddLanguageAction
  | AddLanguageSuccessAction
  | AddLanguageErrorAction;

export interface DeleteLanguageAction {
  type: typeof DELETE_LANGUAGE;
  payload: string;
}
export interface DeleteLanguageSuccessAction {
  type: typeof DELETE_LANGUAGE_SUCCESS;
  payload: string;
}

export interface DeleteLanguageErrorAction {
  type: typeof DELETE_LANGUAGE_ERROR;
  error: any;
}

type Delete =
  | DeleteLanguageAction
  | DeleteLanguageSuccessAction
  | DeleteLanguageErrorAction;
