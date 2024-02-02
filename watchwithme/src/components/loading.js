import React from 'react'
import { CircleLoader } from 'react-spinners'

function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
        <div className="relative">
          <CircleLoader color="red" className='text-red-500'/>
          <h6 className='text-red-500'>Loading...</h6>
        </div>
      </div>
      
    )
}

export default Loading