import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'

export const withSsr = (styles, router = true) => Component => {
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
