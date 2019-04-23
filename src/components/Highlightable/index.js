import React from 'react'
import PropTypes from 'prop-types'

import Tags from 'components/Tags'

import Actions from './Actions'
import HighlightedText from './HighlightedText'

import './styles.sass'

class Highlightable extends React.PureComponent {
  static getPositions(selection) {
    const { startContainer, endContainer } = selection.getRangeAt(0)

    const startOffset = parseInt(startContainer.parentNode.dataset.index, 10)
    const endOffset = parseInt(endContainer.parentNode.dataset.index, 10)

    return [Math.min(startOffset, endOffset), Math.max(startOffset, endOffset)]
  }

  constructor(props) {
    super(props)

    this.state = {
      showActions: false,
      actionPosition: {},
      range: {},
    }

    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleSelectRange = this.handleSelectRange.bind(this)
    this.handleUnselectRange = this.handleUnselectRange.bind(this)
    this.handleHiglight = this.handleHiglight.bind(this)
    this.renderActions = this.renderActions.bind(this)
  }

  handleSelectRange(event, start, end) {
    return this.setState({
      showActions: true,
      actionPosition: {
        top: event.clientY,
        left: event.clientX,
      },
      range: {
        start,
        end,
      },
    })
  }

  handleUnselectRange() {
    return this.setState({
      showActions: false,
    })
  }

  handleMouseUp(event) {
    const selection = window.getSelection()
    const selectedText = selection.toString()

    if (!selectedText || !selectedText.length) {
      return this.handleUnselectRange()
    }

    const [start, end] = Highlightable.getPositions(selection)

    return this.handleSelectRange(event, start, end)
  }

  handleHiglight(tagId) {
    const { onHighlight } = this.props
    const { range } = this.state

    onHighlight(tagId, range)

    return this.handleUnselectRange()
  }

  renderActions() {
    const { availableTags } = this.props
    const { actionPosition } = this.state

    return (
      <Actions
        availableTags={availableTags}
        onSubmit={this.handleHiglight}
        position={actionPosition}
      />
    )
  }

  render() {
    const { showActions } = this.state
    const { children, ranges, isEnabled, onRemoveHighlight } = this.props

    return (
      <React.Fragment>
        <div
          {...isEnabled && {
            onMouseUp: this.handleMouseUp,
          }}
        >
          <HighlightedText
            ranges={ranges}
            onRemoveHighlight={onRemoveHighlight}
          >
            {children}
          </HighlightedText>
        </div>

        {isEnabled && showActions && this.renderActions()}
      </React.Fragment>
    )
  }
}

Highlightable.propTypes = {
  availableTags: Tags.propTypes.items,
  children: PropTypes.string.isRequired,
  onHighlight: PropTypes.func.isRequired,
  onRemoveHighlight: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool,
  ranges: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  })),
}

Highlightable.defaultProps = {
  availableTags: [],
  ranges: [],
  isEnabled: false,
}


export default React.memo(Highlightable)
