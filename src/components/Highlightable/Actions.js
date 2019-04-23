import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import Tags from 'components/Tags'

import './styles.sass'

function renderOption({ id, value }) { // eslint-disable-line react/prop-types
  return (
    <option
      key={id}
      value={id}
    >
      {value}
    </option>
  )
}

function HighlightableActions({ availableTags, position, onSubmit }) {
  const [value, setValue] = useState(availableTags[0].id)

  const handleTagChange = ({ currentTarget }) => setValue(parseInt(currentTarget.value, 10))
  const handleSubmit = () => onSubmit(value)

  return (
    <div
      className="hT__Highlightable__Actions"
      style={position}
    >
      <select
        className="hT__Highlightable__Actions__TagSelector"
        onChange={useCallback(handleTagChange)}
        value={value}
      >
        {availableTags.map(renderOption)}
      </select>

      <div
        className="hT__Highlightable__Actions__Button"
        onClick={handleSubmit}
      >
        ✓
      </div>
    </div>
  )
}

HighlightableActions.propTypes = {
  availableTags: Tags.propTypes.items,
  position: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

HighlightableActions.defaultProps = {
  availableTags: [],
}

export default React.memo(HighlightableActions)
