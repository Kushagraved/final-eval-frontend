import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GET_CONTENT_TYPES } from '../../constants/apiEndPoints'
import makeRequest from '../../utils/makeRequest'
import './CollectionTypes.css'
const CollectionTypes = () => {
  const [contentTypes, setContentTypes] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchContentTypes = async () => {
      const { data } = await makeRequest(GET_CONTENT_TYPES, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setContentTypes(data)
    }
    fetchContentTypes()
  }, [])
  return (
    <div className='CollectionTypes'>
      <div className='ct-header'>
        <h3>COLLECTION TYPES</h3>
        <i className='fa-solid fa-magnifying-glass'></i>
      </div>
      <ul type='solid circle'>
        {contentTypes.map((contentType) => (
          <li key={contentType.id} onClick={() => navigate(`/collections/${contentType.id}`)}>
            <span>{contentType.name}</span>
          </li>
        ))}
      </ul>
      <h3 className='ct-footer' onClick={() => navigate('/')}>
        CONTENT TYPE BUILDER
      </h3>
    </div>
  )
}

export default CollectionTypes
