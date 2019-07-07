import React from 'react'
import { AsyncComponentProvider } from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import createStore, { history } from 'store'
import App from 'App'

const store = createStore(window.__INITIAL_STATE__)

const rehydrateState = window.ASYNC_COMPONENTS_STATE

if (!__DEV__) {
  delete window.__INITIAL_STATE__
  delete window.ASYNC_COMPONENTS_STATE
}

const render = () => {
  const app = (
    <AsyncComponentProvider rehydrateState={rehydrateState}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AsyncComponentProvider>
  )

  asyncBootstrapper(app).then(() =>
    hydrate(app, document.getElementById('app')),
  )
}

render()

if (__DEV__) {
  module.hot.accept('App', render)
}

if (
  !__DEV__ &&
  (location.protocol === 'https:' ||
    ['127.0.0.1', 'localhost'].includes(location.hostname)) &&
  navigator.serviceWorker
) {
  navigator.serviceWorker.register('/service-worker.js')
}
