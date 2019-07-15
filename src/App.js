import { startCase } from 'lodash'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Redirect } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { withRouter, NavLink } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import Loadable from 'react-loadable'

import 'styles/app'

const resolver = loader =>
  Loadable({
    loader,
    loading: () => null,
  })

const createListView = id =>
  resolver(() => import('views/CreateListView').then(m => m.default(id)))

const RedirectToTop = () => <Redirect to="/top" />

RedirectToTop.preload = ({ context }) => (context.url = '/top')

export const routes = [
  {
    path: '/',
    exact: true,
    component: RedirectToTop,
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

      constructor(props, context) {
        super(props, context)
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

const transitionStyles = {
  entering: {
    opacity: 0,
  },
  entered: {
    opacity: 1,
  },
}

@withRouter
export default class App extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  render() {
    const { location } = this.props
    return (
      <>
        <header className="header">
          <div className="header-content">
            <NavLink to="/" exact>
              <img className="logo" src="/public/logo.svg" alt="React Logo" />
            </NavLink>
            <nav className="inner">
              {['top', 'new', 'show', 'ask', 'job'].map(route => (
                <NavLink key={route} to={`/${route}`}>
                  {startCase(route)}
                </NavLink>
              ))}
            </nav>
            <a
              className="github"
              href="https://github.com/JounQin/react-hackernews"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built with React.js
              <img src="/public/external.svg" />
            </a>
          </div>
        </header>
        <TransitionGroup component={Fragment}>
          <Transition
            timeout={200}
            key={location.pathname.split('/')[1]}
            mountOnEnter={true}
            unmountOnExit={true}
          >
            {status => (
              <div className="view" style={transitionStyles[status]}>
                {renderRoutes(routes, null, { location })}
              </div>
            )}
          </Transition>
        </TransitionGroup>
      </>
    )
  }
}
