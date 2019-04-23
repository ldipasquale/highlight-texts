import React from 'react'
import PropTypes from 'prop-types'

import './styles.sass'

class TagsItem extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    const { id, onRemove } = this.props

    return onRemove(id)
  }

  render() {
    const { children, counter } = this.props

    return (
      <div className="hT__Tags__Item">
        <div className="hT__Tags__Item__Title">{children}</div>

        {counter > 0 && (
          <div className="hT__Tags__Item__Counter">{counter}</div>
        )}

        <img
          src="/public/remove.png"
          alt="Remove Item"
          className="hT__Tags__Item__RemoveButton"
          onClick={this.handleRemove}
        />
      </div>
    )
  }
}

TagsItem.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  counter: PropTypes.number,
}

TagsItem.defaultProps = {
  counter: 0,
}

export default TagsItem
