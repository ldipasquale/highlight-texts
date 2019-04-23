import React from 'react'

import Card from 'components/Card'
import Form from 'components/Form'
import Highlightable from 'components/Highlightable'
import Tags from 'components/Tags'
import Spinner from 'components/Spinner'

import useTags from './useTags'
import useParagraph from './useParagraph'

import './styles.sass'

function Home() {
  const [tags, ranges, handleAddTag, handleRemoveTag, handleAddRange, handleRemoveRange] = useTags()
  const [paragraph, isFetching] = useParagraph()

  if (isFetching) {
    return (
      <Spinner />
    )
  }

  return (
    <div className="hT__Home">
      <Card className="hT__Home__SelectableArea">
        <Highlightable
          isEnabled={tags.length > 0}
          ranges={ranges}
          availableTags={tags}
          onHighlight={handleAddRange}
          onRemoveHighlight={handleRemoveRange}
        >
          {paragraph}
        </Highlightable>
      </Card>

      <Card className="hT__Home__TagsList">
        <Form
          placeholder="Add tag"
          button="+"
          onSubmit={handleAddTag}
        />

        <Tags
          items={tags}
          onRemoveItem={handleRemoveTag}
          className="hT__Home__TagsList__Items"
        />
      </Card>
    </div>
  )
}

export default React.memo(Home)
