import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import TagsItem from './Item'

import './styles.sass'

class Tags extends React.PureComponent {
  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem({ id, value, ranges }) {
    const { onRemoveItem } = this.props

    return (
      <TagsItem
        key={id}
        id={id}
        onRemove={onRemoveItem}
        counter={ranges.length}
      >
        {value}
      </TagsItem>
    )
  }

  render() {
    const { items, className } = this.props

    return (
      <div
        className={cx({
          hT__Tags: true,
          [className]: className !== null,
        })}
      >
        {items.length === 0 ? (
          <div className="hT__Tags__EmptyMessage">
            {'You didn\'t added any tag. Would you like to add a new one?'}
          </div>
        ) : items.map(this.renderItem)}
      </div>
    )
  }
}

Tags.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    ranges: PropTypes.array,
  })),
  onRemoveItem: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Tags.defaultProps = {
  items: [],
  className: null,
}

export default Tags
