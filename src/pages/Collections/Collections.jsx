/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CollectionTypes from '../../components/CollectionTypes/CollectionTypes'
import OffCanvas from '../../components/OffCanvas/OffCanvas'
import { DELETE_ENTRY, GET_COLLECTION_BY_ID, GET_FIELDS } from '../../constants/apiEndPoints'
import makeRequest from '../../utils/makeRequest'
import './Collections.css'

const Collections = () => {
  const { contentTypeId } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [fields, setFields] = useState([])
  const [collections, setCollections] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [collectionId, setCollectionId] = useState(null)

  const handleEdit = (id) => {
    setCollectionId(id)
    setIsOpen(true)
  }
  const handleDelete = async (id) => {
    const { data } = await makeRequest(DELETE_ENTRY, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        collectionId: id,
      },
    })

    const updatedCollections = collections.filter((collection) => collection.id !== id)
    setCollections([...updatedCollections])
  }
  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setCollectionId(null)
  }
  const updateCollections = (data) => {
    setCollections([...collections, data])
  }
  const updateCollectionsOnEdit = (data) => {
    const index = collections.findIndex((collection) => collection.id === data.id)
    collections[index].entries = data.entries
    setCollections([...collections])
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
    <>
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
              <span>{collections.length} Entries Found</span>
              <span onClick={toggleMenu}>Add a new entry</span>
            </div>
            <div className='entries'>
              <table>
                <thead>
                  {collections.length !== 0 && (
                    <tr style={{ width: '100vw' }}>
                      {Object.entries(fields).map(([key, value]) => {
                        if (count == 4) {
                          return
                        }
                        count++
                        return <th key={key}>{value}</th>
                      })}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {collections.map((collection) => {
                    return (
                      <tr key={collection.id} style={{ backgroundColor: 'white' }}>
                        {Object.entries(collection.entries).map(([key, value]) => {
                          return <td key={key}>{value}</td>
                        })}
                        <td style={{ display: 'flex', gap: '1rem' }}>
                          <i className='fa fa-pencil' onClick={() => handleEdit(collection.id)}></i>
                          <i
                            className='fa-regular fa-trash-can'
                            onClick={() => handleDelete(collection.id)}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='wrapper'>
          <div className={isOpen ? 'overlay blur' : ''} onClick={toggleMenu}></div>

          <OffCanvas
            closeModal={toggleMenu}
            contentTypeId={contentTypeId}
            fields={fields}
            updateCollections={updateCollections}
            updateCollectionsOnEdit={updateCollectionsOnEdit}
            collectionId={collectionId}
          />
        </div>
      )}
    </>
  )
}

export default Collections
