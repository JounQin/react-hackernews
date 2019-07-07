import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles'

import { withSsr } from 'utils'

const Spinner = ({ show }) =>
  show ? (
    <svg
      className={'spinner' + (show ? ' show' : '')}
      width="44px"
      height="44px"
      viewBox="0 0 44 44"
    >
      <circle
        className="path"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        cx="22"
        cy="22"
        r="20"
      />
    </svg>
  ) : null

Spinner.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default withSsr(styles)(Spinner)
