import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history'
import {
  compose,
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux'
import { thunk } from 'redux-thunk'

import * as reducers from './reducers.js'

export const history = __SERVER__
  ? createMemoryHistory()
  : createBrowserHistory()

const createRootReducer = () =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  })

const composeEnhancers =
  (__DEV__ && !__SERVER__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export default initialState =>
  createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
  )

export * from './actions.js'
export * from './selectors.js'
