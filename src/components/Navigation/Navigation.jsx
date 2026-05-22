import React from 'react'
import './Navigation.css'

const Navigation = ({ onRouteChange }) => {
  return (
    <div className="nav-container">
      <button className="logout-btn" onClick={() => {onRouteChange('signin')}}>Log Out</button>
    </div>
  )
}


export default Navigation