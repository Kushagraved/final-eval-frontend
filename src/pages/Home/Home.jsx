import React from 'react'
import NewType from '../../components/NewType/NewType'
import './Home.css'
const Home = () => {
  return (
    <div className='Home'>
      <div className='left'>
        <div className='left-heading'>CMS+</div>
        <div className='left-main'></div>
      </div>
      <div className='right'>
        <div className='right-heading'>Content Types</div>
        <div className='right-main'>
          <div className='content-types'>
            <NewType />
          </div>
          <div className='content-fields'></div>
        </div>
      </div>
    </div>
  )
}

export default Home
