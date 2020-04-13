import { RootState } from '../reducers';

export const getLanguagesIsLoadedFromState = (state: RootState) => state.languagesReducer.isLoadedLanguages;
export const getLanguagesFromState = (state: RootState) => state.languagesReducer.languages;
