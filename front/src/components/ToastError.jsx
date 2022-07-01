import React from 'react'
import { ToastContainer } from 'react-toastify';
const ToastError = () => {
  return (
    <div>
        <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
        />
        {/* same as */}
        
        <ToastContainer/>
    </div>
  )
}

export default ToastError