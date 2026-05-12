import React from 'react'
import './ImageLinkForm.css'


const ImageLinkForm = ({ onBtnSubmit, onInputChange }) => {
  return (
    <div className="form-container">
      <div className="form-text">
        <p>This Face Scanner will detect faces in your pictures. Give it a try!</p>
      </div>
      <div className="form-wrapper">
        <input className="text-input" 
          type="text" 
          name='image-url' 
          placeholder='Paste an image url'
          onChange={onInputChange} 
          />
        <button className="detect-btn" onClick={onBtnSubmit}>Detect</button>
      </div>

    </div>
  )
}


export default ImageLinkForm