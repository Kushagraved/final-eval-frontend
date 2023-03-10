import React, { useState } from 'react'
import './Field.css'
import propTypes from 'prop-types'
import makeRequest from '../../utils/makeRequest'
import { EDIT_FIELD } from '../../constants/apiEndPoints'

const Field = ({ field, contentTypeId, updateField }) => {
  const [input, setInput] = useState('')
  const [edit, setEdit] = useState(false)
  const handleEditField = async () => {
    setEdit(true)
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && input !== '') {
      try {
        await makeRequest(EDIT_FIELD(contentTypeId), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          data: {
            fieldId: field.key,
            fieldValue: input,
          },
        })
        updateField({ [field.key]: input })
        setEdit(false)
      } catch (error) {
        console.log(error.resonse.data)
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
        <i className='fa-regular fa-trash-can' />
      </div>
    </div>
  )
}

Field.propTypes = {
  field: propTypes.object.isRequired,
  contentTypeId: propTypes.number.isRequired,
  updateField: propTypes.func.isRequired,
}

export default Field
