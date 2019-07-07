import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './styles'

import { withSsr, host, timeAgo } from 'utils'

const Item = ({ item }) => (
  <li className="news-item">
    <span className="score">{item.score}</span>
    <span className="title">
      {item.url ? (
        <>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
          <span className="host"> ({host(item.url)})</span>
        </>
      ) : (
        <Link to={'/item/' + item.id}>{item.title}</Link>
      )}
    </span>
    <br />
    <span className="meta">
      {item.type !== 'job' ? (
        <span className="by">
          by <Link to={'/user/' + item.by}>{item.by}</Link>{' '}
        </span>
      ) : null}
      <span className="time">{timeAgo(item.time)} ago</span>
      {item.type !== 'job' ? (
        <span className="comments-link">
          {' '}
          | <Link to={'/item/' + item.id}>{item.descendants} comments</Link>
        </span>
      ) : null}
    </span>
    {item.type !== 'story' ? (
      <span className="label">{' ' + item.type}</span>
    ) : null}
  </li>
)

Item.propTypes = {
  item: PropTypes.object.isRequired,
}

export default withSsr(styles, true)(Item)
