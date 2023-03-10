import React, { useEffect, useState } from 'react'
import './Fields.css'
import propTypes from 'prop-types'
import { ADD_FIELD, GET_FIELDS } from '../../constants/apiEndPoints'
import makeRequest from '../../utils/makeRequest'
import Field from '../Field/Field'
const Fields = ({ contentTypeId }) => {
  const [fields, setFields] = useState([])

  useEffect(() => {
    const getFields = async () => {
      const { data } = await makeRequest(GET_FIELDS(contentTypeId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setFields({ ...data })
    }
    getFields()
  }, [contentTypeId])

  const updateField = (field) => {
    const updatedField = { ...fields, ...field }
    setFields(updatedField)
  }

  const handleNewField = async () => {
    const { data } = await makeRequest(ADD_FIELD(contentTypeId), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        fieldValue: 'Edit me',
      },
    })
    console.log(data)
    setFields({ ...fields, ...data })
  }

  console.log(fields)
  return (
    <div className='Fields'>
      <h3>Content Type Name</h3>
      <button className='home-button' onClick={handleNewField}>
        Add another fields
      </button>
      <div className='fields-container'>
        {Object?.entries(fields).map(([key, value]) => {
          return (
            <Field
              key={key}
              field={{ key, value }}
              contentTypeId={contentTypeId}
              updateField={updateField}
            />
          )
        })}
      </div>
    </div>
  )
}

Fields.propTypes = {
  contentTypeId: propTypes.number.isRequired,
}
export default Fields
