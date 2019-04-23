import { useState } from 'react'

let lastTagId = 0
let lastRangeId = 0

export default function useTags(initialState = []) {
  const [tags, setTags] = useState(initialState)

  const handleAddTag = value => setTags(tags.concat({
    id: lastTagId++,
    value,
    ranges: [],
  }))

  const handleRemoveTag = id => setTags(tags.filter(tag => tag.id !== id))

  const handleAddRange = (tagId, range) => {
    const newTags = [...tags]

    const tagIndex = tags.findIndex(tag => tag.id === tagId)
    const tag = newTags[tagIndex]

    newTags[tagIndex] = {
      ...tag,
      ranges: tag.ranges.concat({
        id: lastRangeId++,
        ...range,
      }),
    }

    return setTags(newTags)
  }

  const ranges = tags.reduce((accumulator, tag) => ([
    ...accumulator,
    ...tag.ranges,
  ]), [])

  const handleRemoveRange = (rangeId) => {
    const tagIndex = tags.findIndex(tag => tag.ranges.some(range => range.id === rangeId))

    const newTags = [...tags]
    const tag = newTags[tagIndex]

    newTags[tagIndex] = {
      ...tag,
      ranges: tag.ranges.filter(range => range.id !== rangeId),
    }

    return setTags(newTags)
  }

  return [tags, ranges, handleAddTag, handleRemoveTag, handleAddRange, handleRemoveRange]
}
