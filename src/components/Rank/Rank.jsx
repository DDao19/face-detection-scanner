import React from 'react'
import './Rank.css'


const Rank = ({ user }) => {
  const firstname = user.firstname || ''
  const entries = user.entries || 0

  const formattedName = firstname
    ? firstname.charAt(0).toUpperCase() + firstname.slice(1)
    : ''
  
  return (
    <div className="rank-container">
      <h2>{formattedName}, your current entry count is...</h2>
      <h2 className="rank-entries">#{entries}</h2>
    </div>
  )
}


export default Rank