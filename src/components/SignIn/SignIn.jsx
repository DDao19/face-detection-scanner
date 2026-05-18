import React, { useState } from 'react'
import './SignIn.css'


const SignIn = ({ onSignIn, onRegister }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmitSignIn = async () => {
    const signinData = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, password: password})
    })
    const response = await signinData.json()
    const data = await response
    
    if (data === "Success") {
      onSignIn()
    } else {
      console.log("Wrong login")
    }
  }

  return (
    <main className="sign-in-container">
      <div className='sign-in-form-container'>
        <div className="sign-in-title">
          <h2>Sign In</h2>
        </div>
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
          {/* <button className='sign-in-btn' onClick={onSignIn}>Sign In</button> */}
        </div>

        <div className="sign-in-register">
          <p onClick={onRegister}>Register</p>
        </div>
      </div>
    </main>
  )
}


export default SignIn