import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { matchRoutes } from 'react-router-config'
import Loadable from 'react-loadable'

import createStore from 'store'
import App, { routes } from 'App'

const preloadAll = Loadable.preloadAll()

export default context =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    await preloadAll

    const { ctx } = context

    const store = createStore()

    const matched = matchRoutes(routes, ctx.url)

    try {
      for (const {
        match,
        route: { component },
      } of matched) {
        let comp

        if (typeof component.preload === 'function') {
          comp = await component.preload({ match, store, context })
        }

        if (!comp) {
          continue
        }

        comp = (comp && comp.default) || comp

        if (typeof comp.preload === 'function') {
          await comp.preload({ match, store, context })
        }
      }

      const { status, url } = context
      if (status || url) {
        return reject(context)
      }
    } catch (e) {
      return reject(e)
    }

    Object.defineProperty(context, 'state', {
      get() {
        return store.getState()
      },
    })

    resolve(
      <Provider store={store}>
        <StaticRouter location={ctx.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>,
    )
  })
