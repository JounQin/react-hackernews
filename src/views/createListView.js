import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ItemList from './ItemList'

import { activeItems, fetchListData } from 'store'

export default type => {
  @connect(
    (state, props) => ({
      activeType: state.activeType,
      activeItems: activeItems(state, props.match.params.page),
    }),
    (dispath, props) => ({
      fetchListData: () =>
        dispath(fetchListData(type, props.match.params.page)),
    }),
  )
  class ListView extends React.PureComponent {
    static propTypes = {
      activeItems: PropTypes.array.isRequired,
      activeType: PropTypes.string.isRequired,
      fetchListData: PropTypes.func.isRequired,
    }

    asyncBootstrap() {
      if (this.props.activeItems.length) {
        return true
      }
      return this.props.fetchListData().then(() => true)
    }

    render() {
      return <ItemList type={type} {...this.props} />
    }
  }

  return hoistStatics(ListView, ItemList)
}
