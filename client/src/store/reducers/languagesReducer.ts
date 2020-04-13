import {
    GET_LANGUAGES,
    GET_LANGUAGES_SUCCESS,
    DELETE_LANGUAGE,
    DELETE_LANGUAGE_SUCCESS,
    GET_LANGUAGES_ERROR,
    DELETE_LANGUAGE_ERROR,
    LANGUAGES_MODAL_ISOPEN,
    ADD_LANGUAGE,
    ADD_LANGUAGE_SUCCESS,
    UPDATE_LANGUAGE,
    UPDATE_LANGUAGE_SUCCESS,
} from '../actions/types';
import { Language } from '../types/languageTypes';

export type LanguagesState = {
    languages: Language[];
    isLoading: boolean;
    isSubmitting: boolean;
    error: any;
    modalIsOpen: boolean;
    isLoadedLanguages: boolean;
};

const initialState: LanguagesState = {
    languages: [],
    isLoading: false,
    isSubmitting: false,
    error: null,
    modalIsOpen: false,
    isLoadedLanguages: false,
};

export default (state = initialState, action): LanguagesState => {
    switch (action.type) {
        case ADD_LANGUAGE:
        case UPDATE_LANGUAGE:
            return {
                ...state,
                isSubmitting: true,
            };
        case ADD_LANGUAGE_SUCCESS: {
            const updatedLanguages = [...state.languages];
            updatedLanguages.unshift(action.payload);
            return {
                ...state,
                isSubmitting: false,
                modalIsOpen: false,
                error: null,
                languages: updatedLanguages,
            };
        }
        case UPDATE_LANGUAGE_SUCCESS: {
            const updatedLanguages = state.languages.map((language) => {
                if (language._id === action.payload._id) {
                    language.name = action.payload.name;
                }
                return language;
            });
            return {
                ...state,
                isSubmitting: false,
                languages: updatedLanguages,
                modalIsOpen: false,
            };
        }
        case LANGUAGES_MODAL_ISOPEN:
            return {
                ...state,
                modalIsOpen: action.status,
            };
        case DELETE_LANGUAGE:
            return {
                ...state,
            };
        case DELETE_LANGUAGE_SUCCESS: {
            const filteredLanguages = state.languages.filter((language) => language._id !== action.payload);
            return {
                ...state,
                languages: filteredLanguages,
                error: null,
            };
        }
        case DELETE_LANGUAGE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case GET_LANGUAGES:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case GET_LANGUAGES_SUCCESS:
            return {
                ...state,
                languages: action.payload,
                isLoading: false,
                isLoadedLanguages: true,
                error: null,
            };
        case GET_LANGUAGES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
