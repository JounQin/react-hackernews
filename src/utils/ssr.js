import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'

const setTitle = (title, self) => {
  title = typeof title === 'function' ? title.call(self, self) : title

  if (!title) {
    return
  }

  if (!__SERVER__) {
    Promise.resolve(title).then(title => {
      if (title) {
        document.title = `React Hackernews | ${title}`
      }
    })
  } else if (self) {
    self.props.staticContext.title = title = `React Hackernews | ${title}`
  }
}

export const withSsr = (styles, router = true, title) => {
  if (typeof router !== 'boolean') {
    title = router
    router = true
  }

  return Component => {
    class SsrConmponent extends React.PureComponent {
      static displayName = `Ssr${Component.displayName ||
        Component.name ||
        'Component'}`

      static propTypes = {
        staticContext: PropTypes.object,
      }

      componentWillMount() {
        if (styles && styles.__inject__) {
          styles.__inject__(this.props.staticContext)
        }

        setTitle(title, this)
      }

      render() {
        return <Component {...this.props} />
      }
    }

    return hoistStatics(
      router ? withRouter(SsrConmponent) : SsrConmponent,
      Component,
    )
  }
}
