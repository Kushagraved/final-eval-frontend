/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { GET_CONTENT_TYPES } from '../../constants/apiEndPoints'
import makeRequest from '../../utils/makeRequest'
import Modal from '../Modal/Modal'
import propTypes from 'prop-types'
import './NewType.css'

const NewType = ({ toggleContentTypeId }) => {
  const [contentTypes, setContentTypes] = useState([])
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const addContentType = (contentType) => {
    setContentTypes([...contentTypes, contentType])
  }

  useEffect(() => {
    const fetchContentTypes = async () => {
      const { data } = await makeRequest(GET_CONTENT_TYPES, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log(data)
      setContentTypes(data)
    }
    fetchContentTypes()
  }, [])

  return (
    <div className='newtype'>
      <button className='home-button' onClick={toggleModal}>
        + New Type
      </button>
      <div>
        {contentTypes.map((contentType) => (
          <div
            key={contentType.id}
            className='content-type'
            onClick={() => toggleContentTypeId(contentType.id)}
          >
            <span>{contentType.name}</span>
          </div>
        ))}
      </div>

      <div className='wrapper'>
        <div className={showModal ? 'overlay blur' : ''} onClick={toggleModal}></div>
        {/* <button onClick={toggleModal}>Open Modal</button> */}
        {showModal && <Modal closeModal={toggleModal} addContentType={addContentType} />}
      </div>
    </div>
  )
}

NewType.propTypes = {
  toggleContentTypeId: propTypes.func.isRequired,
}
export default NewType
