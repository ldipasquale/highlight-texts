import { useState, useEffect } from 'react'

import ParagraphService from 'services/Paragraph'

export default function useParagraph() {
  const [paragraph, setParagraph] = useState('')
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await ParagraphService.get()
      setParagraph(data)
      setIsFetching(false)
    }

    fetchData()
  }, [])

  return [paragraph, isFetching]
}
