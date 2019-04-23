import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './styles.sass'

class HiglightableHighlightedText extends React.PureComponent {
  render() {
    const { children, ranges, onRemoveHighlight } = this.props

    const highlightedChars = {}

    if (ranges.length > 0) {
      ranges.forEach(({ id, start, end }) => {
        for (let i = start; i <= end; i++) {
          highlightedChars[i] = id
        }
      })
    }

    return children.split('').map((char, charIndex) => (
      <span
        className={cx({
          'hT__Highlightable__Char--highlighted': highlightedChars[charIndex] !== undefined,
        })}
        data-index={charIndex}
        key={charIndex}
        onClick={() => onRemoveHighlight(highlightedChars[charIndex])}
      >
        {char}
      </span>
    ))
  }
}

HiglightableHighlightedText.propTypes = {
  children: PropTypes.string.isRequired,
  ranges: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  })),
  onRemoveHighlight: PropTypes.func.isRequired,
}

HiglightableHighlightedText.defaultProps = {
  ranges: [],
}

export default React.memo(HiglightableHighlightedText)
