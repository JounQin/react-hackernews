import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { hydrate } from 'react-dom'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'

import App from 'App'
import createStore, { history } from 'store'

const store = createStore(window.__INITIAL_STATE__)

if (!__DEV__) {
  delete window.__INITIAL_STATE__
}

const render = () =>
  Loadable.preloadReady().then(() =>
    hydrate(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.querySelector('#app'),
    ),
  )

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
