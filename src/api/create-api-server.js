import { initializeApp } from 'firebase/app'
import { child, getDatabase, onValue, ref } from 'firebase/database'
import { LRUCache } from 'lru-cache'

/**
 * @typedef {import('./index.js').DatabaseApi} DatabaseApi
 */

export function createAPI({ config, version }) {
  /**
   * @type {DatabaseApi}
   */
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    const app = initializeApp(config)
    const database = getDatabase(app)

    api = process.__API__ = ref(database, version)

    api.onServer = true

    // fetched item cache
    api.cachedItems = new LRUCache({
      max: 1000,
      ttl: 1000 * 60 * 15, // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {}
    ;['top', 'new', 'show', 'ask', 'job'].forEach(type => {
      onValue(child(api, `${type}stories`), snapshot => {
        api.cachedIds[type] = snapshot.val()
      })
    })
  }

  return api
}
