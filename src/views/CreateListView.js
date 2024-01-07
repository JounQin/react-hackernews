import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ItemList from './ItemList/index.js'

import { activeItems, fetchListData } from 'store'

export default type => {
  @connect(
    (state, props) => ({
      activeItems: activeItems(state, props.match.params.page),
    }),
    (dispatch, props) => ({
      fetchListData: () =>
        dispatch(fetchListData(type, props.match.params.page)),
    }),
  )
  class ListView extends React.PureComponent {
    static propTypes = {
      match: PropTypes.object.isRequired,
    }

    static preload({ store, match }) {
      return store.dispatch(fetchListData(type, match.params.page))
    }

    render() {
      return (
        <ItemList
          type={type}
          {...this.props}
        />
      )
    }
  }

  return hoistStatics(ListView, ItemList)
}
