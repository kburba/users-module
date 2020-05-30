import { takeLatest, put, call, select } from 'redux-saga/effects';
import {
  GET_LANGUAGES,
  DELETE_LANGUAGE,
  ADD_LANGUAGE,
  UPDATE_LANGUAGE,
} from '../actions/types';
import {
  getLanguagesErrorAction,
  getLanguagesSuccessAction,
  deleteLanguagesSuccessAction,
  deleteLanguageErrorAction,
  addLanguageErrorAction,
  addLanguageSuccessAction,
  updateLanguageSuccessAction,
  updateLanguageErrorAction,
} from '../actions/languageActions';
import {
  DeleteLanguageAction,
  AddLanguageAction,
  UpdateLanguageAction,
} from '../types/languageTypes';
import {
  getLanguagesIsLoadedFromState,
  getLanguagesFromState,
} from './selectors';
import { apiFetch } from '../storeUtils';

function* addLanguageSaga({ payload }: AddLanguageAction) {
  try {
    const response = yield call(apiFetch, 'api/languages', {
      method: 'POST',
      data: payload,
    });
    yield put(addLanguageSuccessAction(response.data));
  } catch (error) {
    put(addLanguageErrorAction(error.response.data));
  }
}

function* updateLanguageSaga({ payload }: UpdateLanguageAction) {
  try {
    const { _id, name } = payload;
    yield call(apiFetch, `api/languages/${_id}`, {
      method: 'POST',
      data: { name },
    });
    yield put(updateLanguageSuccessAction(payload));
  } catch (error) {
    put(updateLanguageErrorAction(error.response.data));
  }
}

function* deleteLanguageSaga({ payload }: DeleteLanguageAction) {
  try {
    yield call(apiFetch, `api/languages/${payload}`, {
      method: 'DELETE',
    });
    yield put(deleteLanguagesSuccessAction(payload));
  } catch (error) {
    yield put(deleteLanguageErrorAction(error.message));
  }
}

function* getLanguagesSaga() {
  try {
    const isLoaded = yield select(getLanguagesIsLoadedFromState);
    if (isLoaded) {
      const languagesFromState = yield select(getLanguagesFromState);
      yield put(getLanguagesSuccessAction(languagesFromState));
    } else {
      const languages = yield call(apiFetch, 'api/languages');
      yield put(getLanguagesSuccessAction(languages.data));
    }
  } catch (error) {
    yield put(getLanguagesErrorAction(error.message));
  }
}

export default function* languagesWatcherSaga() {
  yield takeLatest(ADD_LANGUAGE, addLanguageSaga);
  yield takeLatest(UPDATE_LANGUAGE, updateLanguageSaga);
  yield takeLatest(GET_LANGUAGES, getLanguagesSaga);
  yield takeLatest(DELETE_LANGUAGE, deleteLanguageSaga);
}
