import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CollectionTypes from '../../components/CollectionTypes/CollectionTypes'
import { GET_FIELDS } from '../../constants/apiEndPoints'
import makeRequest from '../../utils/makeRequest'
import './Collections.css'
const Collections = () => {
  const { contentTypeId } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [fields, setFields] = useState([]);
  const [collections, setCollections] = useState([]);

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

  useEffect(()=>{
    const getCollections = async () => {
      const { data } = await makeRequest(GET_FIELDS(contentTypeId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setCollections({ ...data })
    }
    getCollections()

  },[])

  return (
    <div className='Collections'>
      <div className='left'>
        <div className='left-heading'>CMS+</div>
        <div className='left-main'>
          <CollectionTypes />
        </div>
      </div>
      <div className='right'>
        <div className='right-heading'>Content Types</div>
        <div className='right-main'>
          <div className='heading'>
            <span>Entries Found</span>
            <span>Add a new entry</span>
          </div>
          <div className='entries'>
            <table>
              <thead>
                <tr style={{ width: '100vw' }}>
                  {Object.entries(fields).map(([key, value]) => {
                    return <th key={key}>{value}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John</td>
                  <td>32</td>
                  <td>USA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collections
