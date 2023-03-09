/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { GET_CONTENT_TYPES } from '../../constants/apiEndPoints'
import makeRequest from '../../utils/makeRequest'
import Modal from '../Modal/Modal'
import './NewType.css'

const NewType = () => {
  const [contentTypes, setContentTypes] = useState([])
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleNewType = async (e) => {
    e.preventDefault()

    await makeRequest()
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
      <button className='home-button' onClick={handleNewType}>
        + New Type
      </button>
      <div>
        {contentTypes.map((contentType) => (
          <div key={contentType.id} className='content-type'>
            <span>{contentType.name}</span>
          </div>
        ))}
      </div>

      {/* <div className={showModal ? 'blur' : ''}>
        <button onClick={toggleModal}>Open Modal</button>
        {showModal && <Modal closeModal={toggleModal} />}
      </div> */}
    </div>
  )
}

export default NewType
