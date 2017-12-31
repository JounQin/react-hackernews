import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withSsr, timeAgo } from 'utils'

import styles from './styles'

const Comment = withSsr(styles)(
  connect(({ items }) => ({ comments: items }))(
    class extends React.PureComponent {
      static propTypes = {
        comments: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
      }

      displayName = 'Comment'

      state = {
        open: true,
      }

      pluralize = n => n + (n === 1 ? ' reply' : ' replies')

      render() {
        const { open } = this.state
        const { comments, id } = this.props

        const comment = comments[id]

        return comment ? (
          <li className="comment">
            <div className="by">
              <Link to={'/user/' + comment.by}>{comment.by}</Link>
              {timeAgo(comment.time)} ago
            </div>
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />

            {comment.kids && comment.kids.length ? (
              <>
                <div className={'toggle' + (open ? ' open' : '')}>
                  <a onClick={() => this.setState({ open: !open })}>
                    {open
                      ? '[-]'
                      : '[+] ' +
                        this.pluralize(comment.kids.length) +
                        ' collapsed'}
                  </a>
                </div>
                <ul
                  className="comment-children"
                  style={{ display: open ? 'block' : 'none' }}
                >
                  {comment.kids.map(id => <Comment key={id} id={id} />)}
                </ul>
              </>
            ) : null}
          </li>
        ) : null
      }
    },
  ),
)

export default Comment
