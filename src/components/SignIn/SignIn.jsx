import React, { useState } from 'react'
import ErrorMsg from '../ErrorMsg/ErrorMsg'
import './SignIn.css'


const SignIn = ({ onRouteChange, loadUser }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signinError, setSigninError] = useState('')
  const [emailValid, setEmailValid] = useState(true);

  const onEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    // Regex test returns true if valid
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailValid(regex.test(value));
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmitSignIn = async () => {
    try {
      if (emailValid && email.length && password.length) {
        const signinData = await fetch('https://face-detection-scanner-api.onrender.com/signin', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email: email, password: password})
        })
        const response = await signinData.json()
        const data = await response
        
        if (data[0].id) {
          loadUser(data)
          onRouteChange('home')
        } else {
          setSigninError("Email or Password is incorrect. Try again")
          console.log("Failed to login")
        }
      } else if (!emailValid) {
        setSigninError("The email entered is invalid")
      } else {
        setSigninError("Please enter your email and password")
      }

    } catch (error) {
      res.json(error)
    }
  }

  return (
    <main className="sign-in-container">
      <div className='sign-in-form-container'>
        <div className="sign-in-title">
          <h2>Sign In</h2>
        </div>
        {signinError.length ? <ErrorMsg error={signinError} /> : null}
        <div className='sign-in-form'>
          <div className='sign-in-form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={onEmailChange} />
          </div>

          <div className='sign-in-form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={onPasswordChange} />
          </div>

          <button className='sign-in-btn' onClick={onSubmitSignIn}>Sign In</button>
        </div>

        <div className="sign-in-register">
          <p onClick={() => {onRouteChange('register')}}>Register</p>
        </div>
      </div>
    </main>
  )
}


export default SignIn