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

  const [user, setUser] = useState({})

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

  const onImageSubmit = () => {
    checkInputValidity()
  }

  const checkInputValidity = async () => {
    const isValid = await isValidImage(input)

    if (isValid) {
      setImageUrl(input)
      setEmptyInput(false)
      setIsValidUrl(true)
      
      const imageUpload = await fetch('http://localhost:3000/image', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: user[0].email})
      })
      const response = await imageUpload.json()
      const data = await response
      
      setUser(data)
    } else {
      setImageUrl('')
      setEmptyInput(true)
      setIsValidUrl(false)
    }

  }

  const isValidImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
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
    const detectionsForSize = await faceapi.resizeResults(detections, { width: element.width, height: element.height })
    setBoxes(detectionsForSize)
    // setLoading(false)
  }

  const onRouteChange = (route) => {
    setRoute(route)
    setInput('')
    setImageUrl('')
    setIsValidUrl(false)
    setEmptyInput(null)
  }

  const loadUser = (userData) => {
    setUser(userData)
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
      <ParticlesBg type="cobweb" color="#8707ff" num={100} bg={true} />
      {
        route === 'home' ? 
        <div className="app-home">
          <Navigation onRouteChange={onRouteChange} />
          <Logo />
          <Rank user={user} />
          <ImageLinkForm onImageSubmit={onImageSubmit} onInputChange={onInputChange} user={user} />
          {imageUrl && isValidUrl ? <ImageDisplay imageUrl={imageUrl} grabImageElement={grabImageElement} boxes={boxes} isValidUrl={isValidUrl} /> : null}
          {emptyInput && !isValidUrl ? <DisplayError /> : null}
        </div>
        :
        (
          route === 'signin' ? 
          <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
          : 
          <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        ) 
      }
      <Footer />
    </div>
  )
}


export default App