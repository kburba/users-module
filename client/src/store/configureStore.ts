import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancer,
  Store,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import monitorReducersEnhancer from './monitorReducer'
import loggerMiddleware from './logger'
import rootReducer from './reducers/index'
import sagas from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(): Store {
  const middlewares = [loggerMiddleware, thunkMiddleware, sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composeEnhancers =
    (window as Window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const composedEnhancers: StoreEnhancer = composeEnhancers(...enhancers)

  const store = createStore(rootReducer, {}, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  sagaMiddleware.run(sagas)

  return store
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}
