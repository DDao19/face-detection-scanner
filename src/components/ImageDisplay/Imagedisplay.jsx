import React, { useEffect } from 'react'
import './ImageDisplay.css'


const ImageDisplay = ({ imageUrl, grabImageElement, boxes }) => {
 
  return (
    <div className="image-display-container">
      <div className="image">
        <img id="inputImage" src={imageUrl} alt="" crossOrigin="anonymous" onLoad={grabImageElement} />
        {boxes.map((face, index) => {
          const left = Math.floor(face.box.x)
          const top = Math.floor(face.box.y)
          const width = Math.floor(face.box.width)
          const height = Math.floor(face.box.height)
          return <div
          className="face-detection-box" 
          key={index}
          style={{
            position: 'absolute',
            left: left,
            top: top,
            width: width,
            height: height 
          }} 
          >
          </div>
        })}
      </div>
    </div>
  )
}


export default ImageDisplay