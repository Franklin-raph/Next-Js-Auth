'use-client'

import React from 'react'

const ErrorAlert = ({error}) => {
  return (
    <div>
        <div className="bg-[red] w-[100%] h-[20%] text-center flex items-center justify-center flex-col relative mt-3 py-1 px-3">
            <i className="ri-close-fill absolute right-2 top-2 text-2xl hover:text-gray-500 cursor-pointer" onClick={() => setError(false)}></i>
            <p className="text-white">{error}</p>
        </div>
    </div>
  )
}

export default ErrorAlert