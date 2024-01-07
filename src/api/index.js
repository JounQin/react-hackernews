/**
 * @typedef {import('firebase/database').DatabaseReference} DatabaseReference
 * @typedef { import('lru-cache').LRUCache } LRUCache
 * @typedef {DatabaseReference & { onServer?: boolean; cachedItems?: LRUCache; cachedIds?: Record<string, unknown> }} DatabaseApi
 */

// this is aliased in webpack config based on server/client build
// eslint-disable-next-line import/no-unresolved
import { createAPI } from 'create-api'
import { child, get, onValue } from 'firebase/database'

const logRequests = !!process.env.DEBUG_API

/**
 * @type {DatabaseApi}
 */
const api = createAPI({
  version: '/v0',
  config: {
    databaseURL: 'https://hacker-news.firebaseio.com',
  },
})

// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
  warmCache()
}

function warmCache() {
  fetchItems((api.cachedIds?.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}

async function fetch(path) {
  if (logRequests) {
    console.log(`fetching ${path}...`)
  }

  const cache = api.cachedItems
  if (cache?.has(path)) {
    if (logRequests) {
      console.log(`cache hit for ${path}.`)
    }
    return cache.get(path)
  }

  const snapshot = await get(child(api, path))
  const val = snapshot.val()
  // mark the timestamp when this item is cached
  if (val) {
    val.__lastUpdated = Date.now()
  }
  if (cache) {
    cache.set(path, val)
  }
  if (logRequests) {
    console.log(`fetched ${path}.`)
  }
  return val
}

export function fetchIdsByType(type) {
  return api.cachedIds?.[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`)
}

export function fetchItem(id) {
  return fetch(`item/${id}`)
}

export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
  return fetch(`user/${id}`)
}

export function watchList(type, cb) {
  let first = true
  const ref = child(api, `${type}stories`)
  return onValue(ref, snapshot => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  })
}
