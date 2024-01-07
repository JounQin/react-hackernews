import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

import { withSsr, host, timeAgo } from 'utils'

const Item = ({ item }) => (
  <li className="news-item">
    <span className="score">{item.score}</span>
    <span className="title">
      {item.url ? (
        <>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
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
      {item.type === 'job' ? null : (
        <span className="by">
          by <Link to={'/user/' + item.by}>{item.by}</Link>{' '}
        </span>
      )}
      <span className="time">{timeAgo(item.time)} ago</span>
      {item.type === 'job' ? null : (
        <span className="comments-link">
          {' '}
          | <Link to={'/item/' + item.id}>{item.descendants} comments</Link>
        </span>
      )}
    </span>
    {item.type === 'story' ? null : (
      <span className="label">{' ' + item.type}</span>
    )}
  </li>
)

Item.propTypes = {
  item: PropTypes.object.isRequired,
}

export default withSsr(styles, true)(Item)
