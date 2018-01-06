import { startCase } from 'lodash'
import p2r from 'path-to-regexp'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { watchList } from 'api'
import { activeItems, setList, ensureActiveItems, fetchListData } from 'store'
import { withSsr, shared } from 'utils'

import Item from 'components/Item'

import styles from './styles'

@connect(
  (state, props) => ({
    activeItems: activeItems(state, props.match.params.page),
    itemsPerPage: state.itemsPerPage,
    lists: state.lists,
  }),
  (dispatch, { type, match: { params: { page } } }) => ({
    setList: (listType, ids) => dispatch(setList(listType, ids)),
    fetchListData: () => dispatch(fetchListData(type, page)),
    ensureActiveItems: () => dispatch(ensureActiveItems(page)),
  }),
)
@withSsr(styles, false, ({ props }) => startCase(props.type))
export default class ItemList extends React.PureComponent {
  static propTypes = {
    activeItems: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    lists: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    fetchListData: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    setList: PropTypes.func.isRequired,
    ensureActiveItems: PropTypes.func.isRequired,
  }

  state = {
    displayedPage: this.page,
    displayedItems: this.props.activeItems,
    itemTransition: 'item',
    transition: 'slide-right',
  }

  get page() {
    return Number(this.props.match.params.page) || 1
  }

  get maxPage() {
    const { itemsPerPage, lists, type } = this.props
    return Math.ceil(lists[type].length / itemsPerPage)
  }

  get hasMore() {
    return this.page < this.maxPage
  }

  loadItems(to = this.page, from = -1) {
    this.props.fetchListData().then(() => {
      if (!this._mounted) {
        return
      }

      if (this.page < 0 || this.page > this.maxPage) {
        this.props.history.replace(`/${this.props.type}`)
        return
      }

      const transition =
        from === -1 ? '' : to > from ? 'slide-left' : 'slide-right'

      this.setState(
        {
          displayedPage: -1,
          itemTransition: '',
          transition,
        },
        () => {
          setTimeout(() => {
            {
              if (!this._mounted) {
                return
              }

              this.setState({
                displayedPage: to,
                displayedItems: this.props.activeItems,
              })
            }
          }, transition ? 500 : 0)
        },
      )
    })
  }

  componentDidMount() {
    this._mounted = true

    if (shared.appMounted) {
      this.loadItems()
    }

    const { type } = this.props

    this.unwatchList = watchList(type, ids => {
      this.props.setList(type, ids)
      this.props.ensureActiveItems().then(() => {
        this.setState({
          displayedItems: this.props.activeItems,
        })
      })
    })

    this.unwatchPage = this.props.history.listen(location => {
      const { params: { page: prevPage }, path } = this.props.match
      if (!p2r(path).exec(location.pathname)) {
        return
      }
      setTimeout(() =>
        this.loadItems(this.props.match.params.page, prevPage || 1),
      )
    })
  }

  componentWillUnmount() {
    this._mounted = false
    this.unwatchList()
    this.unwatchPage()
  }

  render() {
    const { page, maxPage, hasMore } = this
    const {
      displayedItems,
      displayedPage,
      itemTransition,
      transition,
    } = this.state

    const { type } = this.props

    return (
      <div className="news-view">
        <div className="news-list-nav">
          {page > 1 ? (
            <Link to={'/' + type + '/' + (page - 1)}>&lt; prev</Link>
          ) : (
            <a className="disabled">&lt; prev</a>
          )}
          <span>
            {page}/{maxPage}
          </span>
          {hasMore ? (
            <Link to={'/' + type + '/' + (page + 1)}>more &gt;</Link>
          ) : (
            <a className="disabled">more &gt;</a>
          )}
        </div>
        <CSSTransition
          in={displayedPage > 0}
          classNames={transition}
          timeout={transition ? 500 : 0}
          onEntered={() => {
            this.setState({
              itemTransition: 'item',
            })
          }}
        >
          <div className="news-list">
            <TransitionGroup component="ul">
              {displayedItems.map(item => (
                <CSSTransition
                  key={item.id}
                  classNames={itemTransition}
                  timeout={itemTransition ? 500 : 0}
                >
                  <Item item={item} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </CSSTransition>
      </div>
    )
  }
}
