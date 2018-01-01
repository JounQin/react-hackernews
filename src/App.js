import PropTypes from 'prop-types'
import React from 'react'
import { asyncComponent } from 'react-async-component'
import { Redirect } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'

import { shared } from 'utils'

import 'styles/app'

const resolver = resolve => asyncComponent({ resolve })

const createListView = id =>
  resolver(() => import('views/createListView').then(m => m.default(id)))

const routes = [
  {
    path: '/',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: () => <Redirect to="/top" />,
  },
  {
    path: '/top/:page(\\d+)?',
    component: createListView('top'),
  },
  {
    path: '/new/:page(\\d+)?',
    component: createListView('new'),
  },
  {
    path: '/show/:page(\\d+)?',
    component: createListView('show'),
  },
  {
    path: '/ask/:page(\\d+)?',
    component: createListView('ask'),
  },
  {
    path: '/job/:page(\\d+)?',
    component: createListView('job'),
  },
  {
    path: '/item/:id(\\d+)',
    component: resolver(() => import('views/ItemView')),
  },
  {
    path: '/user/:id',
    component: resolver(() => import('views/UserView')),
  },
  {
    path: '*',
    component: class NotFound extends React.PureComponent {
      static propTypes = {
        staticContext: PropTypes.object,
      }

      componentWillMount() {
        if (this.props.staticContext) {
          this.props.staticContext.code = 404
        }
      }
      render() {
        return 'Custom 404 Page, will you implement it?'
      }
    },
  },
]

export default class App extends React.Component {
  componentDidMount() {
    shared.appMounted = true
  }

  render() {
    return (
      <>
        <header className="header">
          <nav className="inner">
            <NavLink to="/" exact>
              <img className="logo" src="/public/logo-48.png" alt="logo" />
            </NavLink>
            <NavLink to="/top">Top</NavLink>
            <NavLink to="/new">New</NavLink>
            <NavLink to="/show">Show</NavLink>
            <NavLink to="/ask">Ask</NavLink>
            <NavLink to="/job">Jobs</NavLink>
            <a
              className="github"
              href="https://github.com/JounQin/react-hackernews"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built with React.js
            </a>
          </nav>
        </header>
        <div className="view">{renderRoutes(routes)}</div>
      </>
    )
  }
}
