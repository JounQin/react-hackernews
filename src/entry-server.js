import React from 'react'
import asyncBootstrapper from 'react-async-bootstrapper'
import {
  AsyncComponentProvider,
  createAsyncContext,
} from 'react-async-component'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import createStore from 'store'

import App from 'App'

export default context =>
  new Promise(async (resolve, reject) => {
    const { ctx } = context

    const asyncContext = (context.asyncContext = createAsyncContext())

    const store = createStore()

    const app = (
      <AsyncComponentProvider asyncContext={asyncContext}>
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </AsyncComponentProvider>
    )

    try {
      await asyncBootstrapper(app)
      const { status, url } = context
      if (status || url) {
        return reject(context)
      }
    } catch (e) {
      return reject(e)
    }

    context.state = store.getState()

    resolve(app)
  })
