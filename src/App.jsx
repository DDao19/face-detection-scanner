import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import ImageDisplay from './components/ImageDisplay/Imagedisplay'
import DisplayError from './components/DisplayError/DisplayError'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Footer from './components/Footer/Footer'

import ParticlesBg from 'particles-bg'
import * as faceapi from 'face-api.js';
import './App.css'

const App = () => {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [route, setRoute] = useState('signin')
  
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [emptyInput, setEmptyInput] = useState(null)
  const [modelIsLoaded, setModelIsLoaded] = useState(false)
  const [boxes, setBoxes] = useState([])

  // useEffect(() => {
  //   const server = async () => {
  //     const server = await fetch('http://localhost:3000')
  //     const response = await server.json()
  //     console.log(response)
  //   }
  //   server()
  // }, []) 

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const onBtnSubmit = () => {
    checkInputValidity()
  }

  const isValidImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  const checkInputValidity = async () => {
    const isValid = await isValidImage(input)

    if (isValid) {
      setImageUrl(input)
      setEmptyInput(false)
      setIsValidUrl(true)
      setLoading(true)
    } else {
      setImageUrl('')
      setEmptyInput(true)
      setIsValidUrl(false)
    }

  }

  const grabImageElement = () => {
    if (imageUrl && modelIsLoaded && isValidUrl){
      const imageElement = document.getElementById("inputImage")
      createFaceDetectionBox(imageElement)

    } 
  }

  const createFaceDetectionBox = async (element) => {
    const detections = await faceapi.detectAllFaces(element, new faceapi.SsdMobilenetv1Options({minConfidence: 0.3}))
      
    // detectionForSize resized the detection box coordinates
    // Without it, it would size it based on the original image size
    const detectionsForSize = faceapi.resizeResults(detections, { width: element.width, height: element.height })
    setBoxes(detectionsForSize)
    setLoading(false)
  }

  const onSignIn = () => {
    setRoute('home')
    setInput('')
    setImageUrl('')
    setIsValidUrl(false)
    setEmptyInput(null)
  }

  const onSignOut = () => {
    setRoute('signin')
  }

  const onRegister = () => {
    setRoute('register')
  }

  const onRegisterBack = () => {
    setRoute('signin')
  }

  // Loads the Model from face-api.js
  useEffect(() => {
    const loadModel = async () => {
      await faceapi.loadSsdMobilenetv1Model('/models')
      setModelIsLoaded(true)
    }

    loadModel()
  }, [])


  return (
    <div className="app">
      <ParticlesBg type="cobweb" color="#8707ff" num={150} bg={true} />
      {
        route === 'home' ? 
        <div className="app-home">
          <Navigation onSignOut={onSignOut} />
          <Logo />
          <Rank />
          <ImageLinkForm onBtnSubmit={onBtnSubmit} onInputChange={onInputChange} />
          {imageUrl && isValidUrl ? <ImageDisplay imageUrl={imageUrl} grabImageElement={grabImageElement} boxes={boxes} isValidUrl={isValidUrl} /> : null}
          {emptyInput && !isValidUrl ? <DisplayError /> : null}
        </div>
        :
        (
          route === 'signin' ? 
          <SignIn onSignIn={onSignIn} onRegister={onRegister} />
          : 
          <Register onSignIn={onSignIn} onRegisterBack={onRegisterBack} />
        ) 
      }
      <Footer />
    </div>
  )
}


export default App