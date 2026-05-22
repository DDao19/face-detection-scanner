import React from 'react'
import './Rank.css'


const Rank = ({ user }) => {
  const [profile] = user
  
  return (
    <div className="rank-container">
      <h2>{profile.firstname}, your current entry count is...</h2>
      <h2 className="rank-entries">#{profile.entries}</h2>
    </div>
  )
}


export default Rank