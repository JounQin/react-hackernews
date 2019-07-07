import TYPES from './types'
import { activeIds } from './selectors'

import {
  fetchIdsByType as _fetchIdsByType,
  fetchItems as _fetchItems,
  fetchUser as _fetchUser,
} from 'api'

export const setLoading = loading => ({
  type: TYPES.SET_LOADING,
  loading,
})

export const setActiveType = activeType => ({
  type: TYPES.SET_ACTIVE_TYPE,
  activeType,
})

export const setList = (listType, ids) => ({
  type: TYPES.SET_LIST,
  listType,
  ids,
})

export const setItems = items => ({
  type: TYPES.SET_ITEMS,
  items,
})

export const setUser = (id, user) => ({
  type: TYPES.SET_USER,
  id,
  user,
})

export const fetchListData = (type, page) => dispatch => {
  dispatch(setActiveType(type))
  return _fetchIdsByType(type)
    .then(ids => dispatch(setList(type, ids)))
    .then(() => dispatch(ensureActiveItems(page)))
}

export const fetchItems = ids => (dispatch, getState) => {
  // on the client, the store itself serves as a cache.
  // only fetch items that we do not already have, or has expired (3 minutes)
  const now = Date.now()
  const state = getState()
  ids = ids.filter(id => {
    const item = state.items[id]
    if (!item) {
      return true
    }
    if (now - item.__lastUpdated > 1000 * 60 * 3) {
      return true
    }
    return false
  })

  if (ids.length) {
    return _fetchItems(ids).then(items => dispatch(setItems(items)))
  } else {
    return Promise.resolve()
  }
}

export const ensureActiveItems = page => (dispatch, getState) =>
  dispatch(fetchItems(activeIds(getState(), page)))

export const fetchUser = id => (dispatch, getState) =>
  getState().users[id]
    ? Promise.resolve()
    : _fetchUser(id).then(user => dispatch(setUser(id, user)))
