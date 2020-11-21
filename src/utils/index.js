export * from './ssr'

export function host(url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-1 * 3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 60 * 60 * 24) {
    return pluralize(~~((between / 60) * 60), ' hour')
  } else {
    return pluralize(~~((between / 60) * 60 * 24), ' day')
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
