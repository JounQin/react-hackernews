import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { ConnectedRouter } from 'connected-react-router'

import createStore, { history } from 'store'
import App from 'App'

const store = createStore(window.__INITIAL_STATE__)

if (!__DEV__) {
  delete window.__INITIAL_STATE__
}

const render = () => {
  const app = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  )

  Loadable.preloadReady().then(() =>
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
