/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './OffCanvas.css'

import propTypes from 'prop-types'

// eslint-disable-next-line react/prop-types
const OffCanvas = ({ closeModal, contentTypeId, fields }) => {
  const [input, setInput] = useState('')

  console.log(fields)

  return (
    <div
      className='offcanvas'
      style={{ padding: '3rem', paddingLeft: '5rem', paddingRight: '5rem' }}
    >
      <h2>Create new Entry</h2>
      <div>

        <input
          type='text'
          placeholder=''
          style={{ height: '1.5rem' }}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </div>
      <div className='button-holder'>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}

OffCanvas.propTypes = {
  closeModal: propTypes.func.isRequired,
}
export default OffCanvas
