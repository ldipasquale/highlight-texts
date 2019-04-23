import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './styles.sass'

function Input({ placeholder, value, onChange, hasError }) {
  return (
    <input
      className={cx({
        hT__Form__Input: true,
        'hT__Form__Input--invalid': hasError,
      })}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
}

Input.defaultProps = {
  placeholder: null,
  hasError: false,
}

export default React.memo(Input)
