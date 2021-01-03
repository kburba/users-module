import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  routing: routerReducer,
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;
