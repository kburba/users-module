import { RootState } from '../reducers';

export const getLanguagesIsLoadedFromState = (state: RootState) => state.languagesReducer.isLoadedLanguages;
export const getLanguagesFromState = (state: RootState) => state.languagesReducer.languages;
export const getServicesIsLoadedFromState = (state: RootState) => state.servicesReducer.isLoadedServices;
export const getServicesFromState = (state: RootState) => state.servicesReducer.services;
