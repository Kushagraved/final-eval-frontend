import React, { useState } from 'react'
import './Modal.css'

import propTypes from 'prop-types'
import { ADD_NEW_TYPE } from '../../constants/apiEndPoints'
import makeRequest from '../../utils/makeRequest'

const Modal = ({ closeModal, addContentType }) => {
  const [input, setInput] = useState('')
  const handleNewType = async (e) => {
    e.preventDefault()
    const { data } = await makeRequest(ADD_NEW_TYPE, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        name: input,
      },
    })
    addContentType(data)
    closeModal()
  }
  return (
    <div className='modal' style={{ padding: '3rem', paddingLeft: '5rem', paddingRight: '5rem' }}>
      <h2>Create a New content type</h2>
      <div>
        <p>Name of the content type</p>
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
        <button onClick={handleNewType} data-testid='cancel-btn'>Create</button>
      </div>
    </div>
  )
}

Modal.propTypes = {
  closeModal: propTypes.func.isRequired,
  addContentType: propTypes.func.isRequired,
}
export default Modal
