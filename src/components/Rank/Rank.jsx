import React from 'react'
import './Rank.css'


const Rank = ({ user }) => {
  console.log(user)
  
  return (
    <div className="rank-container">
      <h2>{user[0].firstname}, your current entry count is...</h2>
      <h2 className="rank-entries">#{user[0].entries}</h2>
    </div>
  )
}


export default Rank