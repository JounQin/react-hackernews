import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import styles from './styles'

import { fetchUser } from 'store'
import { withSsr, timeAgo } from 'utils'

const USER_NOT_FOUND = 'User Not Found'

@connect(
  ({ users }) => ({ users }),
  (dispatch, props) => ({
    fetchUser: () => dispatch(fetchUser(props.match.params.id)),
  }),
)
@withSsr(styles, false, self => {
  const {
    users,
    match: {
      params: { id },
    },
  } = self.props
  const user = users[id]

  if (user) {
    return id
  }

  if (user === false) {
    return USER_NOT_FOUND
  }

  if (!__SERVER__) {
    return self.props
      .fetchUser()
      .then(() => (self.props.users[id] ? id : USER_NOT_FOUND))
  }
})
export default class UserView extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
  }

  get user() {
    const { match, users } = this.props
    return users[match.params.id]
  }

  static preload({ match, store }) {
    return store.dispatch(fetchUser(match.params.id))
  }

  render() {
    const { user } = this

    return (
      <div className="user-view">
        {user ? (
          <>
            <h1>User : {user.id}</h1>
            <ul className="meta">
              <li>
                <span className="label">Created:</span> {timeAgo(user.created)}{' '}
                ago
              </li>
              <li>
                <span className="label">Karma:</span> {user.karma}
              </li>
              {user.about ? (
                <li
                  className="about"
                  dangerouslySetInnerHTML={{ __html: user.about }}
                />
              ) : null}
            </ul>
            <p className="links">
              <a href={'https://news.ycombinator.com/submitted?id=' + user.id}>
                submissions
              </a>{' '}
              |
              <a href={'https://news.ycombinator.com/threads?id=' + user.id}>
                comments
              </a>
            </p>
          </>
        ) : user === false ? (
          <h1>User not found.</h1>
        ) : null}
      </div>
    )
  }
}
