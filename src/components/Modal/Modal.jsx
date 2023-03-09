import React from 'react'
import './Modal.css'

import propTypes from 'prop-types'
const Modal = ({ closeModal }) => {
  return (
    <div className='modal'>
      <h2>Modal Title</h2>
      <p>Modal Content</p>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  )
}

Modal.propTypes = {
  closeModal: propTypes.func.isRequired,
}
export default Modal
