import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { fetchUser } from 'store'
import { withSsr, timeAgo } from 'utils'

import styles from './styles'

@withSsr(styles, false)
@connect(
  ({ users }) => ({ users }),
  (dispath, props) => ({
    fetchUser: () => dispath(fetchUser(props.match.params.id)),
  }),
)
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

  asyncBootstrap() {
    if (this.user != null) {
      return true
    }

    return this.props.fetchUser().then(() => true)
  }

  componentDidMount() {
    this.asyncBootstrap()
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
