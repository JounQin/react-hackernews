import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './styles'

import Spinner from 'components/Spinner'
import Comment from 'components/Comment'
import { fetchItems } from 'store'
import { withSsr, host, timeAgo } from 'utils'

@connect(
  ({ items }) => ({ items }),
  dispatch => ({
    fetchItems: ids => dispatch(fetchItems(ids)),
  }),
)
@withSsr(styles, false, ({ props }) => {
  const {
    items,
    match: {
      params: { id },
    },
  } = props
  return items[id] && items[id].title
})
export default class ItemView extends React.PureComponent {
  static propTypes = {
    items: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    fetchItems: PropTypes.func.isRequired,
  }

  state = {
    loading: false,
  }

  static preload({ match, store }) {
    const { id } = match.params
    return store.dispatch(fetchItems([id]))
  }

  get item() {
    return this.props.items[this.props.match.params.id]
  }

  fetchItems() {
    const { item } = this

    if (!item || !item.kids) {
      return
    }

    this.setState({
      loading: true,
    })

    this.fetchComments(item).then(() =>
      this.setState({
        loading: false,
      }),
    )
  }

  fetchComments(item) {
    if (item && item.kids) {
      return this.props
        .fetchItems(item.kids)
        .then(() =>
          Promise.all(
            item.kids.map(id => this.fetchComments(this.props.items[id])),
          ),
        )
    }
  }

  render() {
    const { loading } = this.state
    const { item } = this

    return item ? (
      <div className="item-view">
        <div className="item-view-header">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <h1>{item.title}</h1>
          </a>
          {item.url ? <span className="host">({host(item.url)})</span> : null}
          <p className="meta">
            {item.score} points | by{' '}
            <Link to={'/user/' + item.by}>{item.by}</Link>
            {' ' + timeAgo(item.time)} ago
          </p>
        </div>
        <div className="item-view-comments">
          <p className="item-view-comments-header">
            {item.kids ? item.descendants + ' comments' : 'No comments yet.'}
            <Spinner show={loading} />
          </p>
          {loading || !item.kids ? null : (
            <ul className="comment-children">
              {item.kids.map(id => (
                <Comment key={id} id={id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    ) : null
  }
}
