import React, { useState } from 'react'
import './Field.css'
import propTypes from 'prop-types'
import makeRequest from '../../utils/makeRequest'
import { DELETE_FIELD, EDIT_FIELD } from '../../constants/apiEndPoints'

// eslint-disable-next-line react/prop-types
const Field = ({ field, contentTypeId, updateField, deleteField }) => {
  const [input, setInput] = useState('')
  const [edit, setEdit] = useState(false)
  const [error, setError] = useState(null)

  const handleEditField = async () => {
    setEdit(true)
  }

  const handleDeleteFields = async () => {
    const res = await makeRequest(DELETE_FIELD(contentTypeId), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        fieldId: field.key,
      },
    })
    console.log('res', res)
    deleteField(field.key)
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && input !== '') {
      try {
        const { data } = await makeRequest(EDIT_FIELD(contentTypeId), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          data: {
            fieldId: field.key,
            fieldValue: input,
          },
        })
        updateField(data[0].fields)
        setEdit(false)
      } catch (error) {
        setError(error.response.data.message)
      }
    }
  }
  return (
    <div className='Field'>
      <div className='img'>
        <span>Ab</span>
      </div>
      <div className='center'>
        <span>{field.value}</span>
        {edit && (
          <input
            type='text'
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={handleKeyDown}
          ></input>
        )}
      </div>
      <div className='engagement'>
        <i className='fa fa-pencil' onClick={handleEditField}></i>
        <i className='fa-regular fa-trash-can' onClick={handleDeleteFields} />
      </div>

      {error && (
        <span
          className='error'
          style={{
            color: 'red',
            width: '50vw',
            fontSize: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          *{error}
        </span>
      )}
    </div>
  )
}

Field.propTypes = {
  field: propTypes.object.isRequired,
  contentTypeId: propTypes.number.isRequired,
  updateField: propTypes.func.isRequired,
}

export default Field
