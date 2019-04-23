import React from 'react'
import Loader from 'react-loader-spinner'

import './styles.sass'

export default function () {
  return (
    <div className="hT__Spinner">
      <Loader
        type="Puff"
        color="#81d4fa"
        height="72"
        width="72"
      />
    </div>
  )
}
