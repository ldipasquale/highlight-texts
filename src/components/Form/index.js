import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import useForm from './useForm'
import Input from './Input'

import './styles.sass'

function Form({ placeholder, button, onSubmit }) {
  const [value, handleChangeValue, hasError, handleSubmit] = useForm('', onSubmit)

  return (
    <div className="hT__Form">
      <Input
        placeholder={placeholder}
        onChange={useCallback(handleChangeValue)}
        value={value}
        hasError={hasError}
      />

      <div
        className="hT__Form__Button"
        onClick={useCallback(handleSubmit)}
      >
        {button}
      </div>
    </div>
  )
}

Form.propTypes = {
  placeholder: PropTypes.string,
  button: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

Form.defaultProps = {
  placeholder: null,
}

export default React.memo(Form)
