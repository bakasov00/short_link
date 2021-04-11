import React from 'react'

function Loader() {
  return (
    <div>
      <div className='preloader-wrapper big active'>
        <div className='spinner-layer spinner-blue-only'>
          <div className='circle-clipper left'>
            <div className='circle'></div>
          </div>
          <div className='gap-patch'>
            <div className='circle'></div>
          </div>
          <div className='circle-clipper right'>
            <div className='circle'></div>
          </div>
        </div>
      </div>
      Loading...
    </div>
  )
}

export default Loader
