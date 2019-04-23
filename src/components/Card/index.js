import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './styles.sass'

function Card({ children, className }) {
  return (
    <div
      className={cx({
        hT__Card: true,
        [className]: className !== null,
      })}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Card.defaultProps = {
  className: null,
}

export default React.memo(Card)
