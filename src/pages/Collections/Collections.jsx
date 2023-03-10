import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CollectionTypes from '../../components/CollectionTypes/CollectionTypes'
import OffCanvas from '../../components/OffCanvas/OffCanvas'
import { GET_COLLECTION_BY_ID, GET_FIELDS } from '../../constants/apiEndPoints'
import makeRequest from '../../utils/makeRequest'
import './Collections.css'
const Collections = () => {
  const { contentTypeId } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [fields, setFields] = useState([])
  const [collections, setCollections] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

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

  useEffect(() => {
    const getCollections = async () => {
      const { data } = await makeRequest(GET_COLLECTION_BY_ID(contentTypeId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setCollections([...data.collections])
    }
    getCollections()
  }, [contentTypeId])

  let count = 0
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
        <div className='right-main' style={{ backgroundColor: '#ebeefe' }}>
          <div className='heading' style={{ backgroundColor: '#ebeefe' }}>
            <span>Entries Found</span>
            <span onClick={toggleMenu}>Add a new entry</span>
          </div>
          <div className='entries'>
            <table>
              <thead>
                <tr style={{ width: '100vw' }}>
                  {Object.entries(fields).map(([key, value]) => {
                    if (count == 4) {
                      return
                    }
                    count++
                    return <th key={key}>{value}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {collections.map((collection) => {
                  return (
                    <tr key={collection.id} style={{ backgroundColor: 'white' }}>
                      {Object.entries(collection.entries).map(([key, value]) => {
                        return <td key={key}>{value}</td>
                      })}
                      <td></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='wrapper'>
          <div className={isOpen ? 'overlay blur' : ''} onClick={toggleMenu}></div>
          {/* <button onClick={toggleModal}>Open Modal</button> */}
          {<OffCanvas closeModal={toggleMenu} contentTypeId={contentTypeId} fields={fields} />}
        </div>
      )}
    </div>
  )
}

export default Collections
