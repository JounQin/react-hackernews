import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'

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

      constructor(props, context) {
        super(props, context)
        if (styles.__inject__) {
          styles.__inject__(this.props.staticContext)
        }

        this.setTitle()
      }

      setTitle() {
        const t = typeof title === 'function' ? title.call(this, this) : title

        if (!t) {
          return
        }

        if (__SERVER__) {
          this.props.staticContext.title = `React Hackernews | ${t}`
          return
        }

        Promise.resolve(t).then(title => {
          if (title) {
            document.title = `React Hackernews | ${title}`
          }
        })
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
