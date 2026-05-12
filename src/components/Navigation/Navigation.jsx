import React from 'react'
import './Navigation.css'

const Navigation = ({ onSignOut }) => {
  return (
    <div className="nav-container">
      <button className="logout-btn" onClick={onSignOut}>Log Out</button>
    </div>
  )
}


export default Navigation