/** store.js */
import rootSaga from "./sagas/rootSaga";
import reducers, { RootState } from "./reducers";
import createSagaMiddleware from "redux-saga";
import { createStore, compose, applyMiddleware } from "redux";
/** Saga Middleware */
const sagaMiddleware = createSagaMiddleware();
/** Create redux store */
const initialState = {};
const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

const store = createStore<RootState, any, any, any>(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
/** run saga watchers */
sagaMiddleware.run(rootSaga);
export default store;