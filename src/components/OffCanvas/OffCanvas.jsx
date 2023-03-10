/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './OffCanvas.css'

import propTypes from 'prop-types'
import makeRequest from '../../utils/makeRequest'
import { ADD_ENTRY, GET_ENTRY, UPDATE_ENTRY } from '../../constants/apiEndPoints'

// eslint-disable-next-line react/prop-types
const OffCanvas = ({
  closeModal,
  contentTypeId,
  fields,
  updateCollections,
  collectionId,
  updateCollectionsOnEdit,
}) => {
  const initialState = {}
  const [formData, setData] = useState(initialState)
  const [preFilled, setPreFilled] = useState({})

  console.log(fields)
  const handleChange = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value })
  }
  console.log(formData)
  const resetForm = () => {
    setData(initialState)
  }
  const handleAddEntry = async () => {
    if (collectionId !== null) {
      const { data } = await makeRequest(UPDATE_ENTRY, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          collectionId,
          data: {
            ...formData,
          },
        },
      })
      updateCollectionsOnEdit(data)
      return
    }
    const { data } = await makeRequest(ADD_ENTRY, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        contentTypeId,
        data: {
          ...formData,
        },
      },
    })
    updateCollections(data)
    console.log(data)
  }
  console.log('form data', formData)

  const getEntry = async () => {
    const { data } = await makeRequest(GET_ENTRY, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        collectionId: collectionId,
      },
    })
    setPreFilled(data.entries)
  }

  useEffect(() => {
    if (collectionId !== null) {
      getEntry()
    }
  }, [])
  return (
    <div
      className='offcanvas'
      style={{ padding: '3rem', paddingLeft: '5rem', paddingRight: '5rem' }}
    >
      <h2>Create new Entry</h2>
      <div>
        {Object.entries(fields).map(([key, value]) => {
          return (
            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
              <label>{value}</label>
              <input
                type='text'
                placeholder=''
                name={value}
                style={{ height: '1.5rem' }}
                onChange={handleChange}
                defaultValue={preFilled[value] ?? ''}
                // value={formData[value]}
              />
            </div>
          )
        })}
      </div>
      <div className='button-holder'>
        <button
          onClick={() => {
            closeModal()
          }}
        >
          Cancel
        </button>
        <button onClick={handleAddEntry}>Add</button>
      </div>
    </div>
  )
}

OffCanvas.propTypes = {
  closeModal: propTypes.func.isRequired,
}
export default OffCanvas
