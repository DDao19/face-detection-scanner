import React from 'react'
import './ErrorMsg.css'

const ErrorMsg = ({ error }) => {
  return (
    <div className="error-msg-container">
      <p>{error}</p>
    </div>
  )
}



export default ErrorMsg