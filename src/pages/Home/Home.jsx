import React, { useState } from 'react'
import CollectionTypes from '../../components/CollectionTypes/CollectionTypes'
import Fields from '../../components/Fields/Fields'
import NewType from '../../components/NewType/NewType'
import './Home.css'
const Home = () => {
  const [contentTypeId, setContentTypeId] = useState(null)
  console.log(contentTypeId)

  const toggleContentTypeId = (id) => {
    setContentTypeId(id)
  }

  return (
    <div className='Home'>
      <div className='left'>
        <div className='left-heading'>CMS+</div>
        <div className='left-main'>
          <CollectionTypes />
        </div>
      </div>
      <div className='right'>
        <div className='right-heading'>Content Types</div>
        <div
          className='right-main'
          style={{ display: 'grid', gridTemplateColumns: '30% 70%', width: '100%', padding: '0' }}
        >
          <div className='content-types'>
            <NewType toggleContentTypeId={toggleContentTypeId} />
          </div>
          <div className='content-fields'>
            {contentTypeId !== null && <Fields contentTypeId={contentTypeId}></Fields>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
