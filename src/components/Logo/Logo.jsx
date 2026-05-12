import React from 'react'
import Tilt from 'react-parallax-tilt'
import image from './robot-emoji.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className="logo-container">
      <Tilt 
      className="logo-tilt"
      perspective={500}
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.02}
      >
        <div className='logo-content'>
          <h2>Scanning...</h2>
          <img src={image} alt="" />
        </div>
        
      </Tilt>
    </div>
  )
}


export default Logo