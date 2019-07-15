import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './styles'

import { withSsr, timeAgo } from 'utils'

const pluralize = n => n + (n === 1 ? ' reply' : ' replies')

const Comment = ({ comments, id }) => {
  const [open, setOpen] = useState(true)

  const comment = comments[id]

  return comment ? (
    <li className="comment">
      <div className="by">
        {comment.by ? (
          <Link to={'/user/' + comment.by}>{comment.by}</Link>
        ) : null}
        {' ' + timeAgo(comment.time)} ago
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{
          __html: comment.text || '<del>[Deleted]</del>',
        }}
      />
      {comment.kids && comment.kids.length ? (
        <>
          <div className={'toggle' + (open ? ' open' : '')}>
            <a onClick={() => setOpen(!open)}>
              {open
                ? '[-]'
                : '[+] ' + pluralize(comment.kids.length) + ' collapsed'}
            </a>
          </div>
          <ul
            className="comment-children"
            style={{ display: open ? 'block' : 'none' }}
          >
            {comment.kids.map(id => (
              <Comment key={id} id={id} />
            ))}
          </ul>
        </>
      ) : null}
    </li>
  ) : null
}

Comment.propTypes = {
  comments: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
}

export default connect(({ items }) => ({ comments: items }))(
  withSsr(styles)(Comment),
)
