export const activeIds = (state, page = 1) => {
  const { activeType, itemsPerPage, lists } = state

  if (!activeType) {
    return []
  }

  const start = (page - 1) * itemsPerPage
  const end = page * itemsPerPage

  return lists[activeType].slice(start, end)
}

export const activeItems = (state, page) =>
  activeIds(state, page)
    .map(id => state.items[id])
    .filter(_ => _)
