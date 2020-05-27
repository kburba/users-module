import {
  GET_LANGUAGES,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_ERROR,
  DELETE_LANGUAGE,
  DELETE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGE_ERROR,
  ADD_LANGUAGE,
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_ERROR,
  UPDATE_LANGUAGE_ERROR,
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_SUCCESS,
  LANGUAGES_MODAL_ISOPEN,
} from './types';
import { LanguageActions, Language, NewLanguage } from '../types/languageTypes';

export function setLanguagesModal(status: boolean): LanguageActions {
  return {
    type: LANGUAGES_MODAL_ISOPEN,
    status,
  };
}

export function updateLanguageAction(language: Language): LanguageActions {
  return {
    type: UPDATE_LANGUAGE,
    payload: language,
  };
}

export function updateLanguageSuccessAction(
  language: Language
): LanguageActions {
  return {
    type: UPDATE_LANGUAGE_SUCCESS,
    payload: language,
  };
}

export function updateLanguageErrorAction(error: any): LanguageActions {
  return {
    type: UPDATE_LANGUAGE_ERROR,
    error,
  };
}

export function addLanguageAction(language: NewLanguage): LanguageActions {
  return {
    type: ADD_LANGUAGE,
    payload: language,
  };
}

export function addLanguageSuccessAction(language: Language): LanguageActions {
  return {
    type: ADD_LANGUAGE_SUCCESS,
    payload: language,
  };
}

export function addLanguageErrorAction(error: any): LanguageActions {
  return {
    type: ADD_LANGUAGE_ERROR,
    error,
  };
}

export function deleteLanguageAction(id: string): LanguageActions {
  return { type: DELETE_LANGUAGE, payload: id };
}

export function deleteLanguagesSuccessAction(id: string): LanguageActions {
  return { type: DELETE_LANGUAGE_SUCCESS, payload: id };
}

export function deleteLanguageErrorAction(error: string): LanguageActions {
  return { type: DELETE_LANGUAGE_ERROR, error };
}

export function getLanguagesAction(): LanguageActions {
  return { type: GET_LANGUAGES };
}

export function getLanguagesSuccessAction(
  languages: Language[]
): LanguageActions {
  return { type: GET_LANGUAGES_SUCCESS, payload: languages };
}

export function getLanguagesErrorAction(error: any): LanguageActions {
  return { type: GET_LANGUAGES_ERROR, error };
}
