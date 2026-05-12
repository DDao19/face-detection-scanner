import React from 'react'
import './SignIn.css'


const SignIn = ({ onSignIn, onRegister }) => {
  return (
    <div className="sign-in-container">
      <div className='sign-in-form-container'>
        <div className="sign-in-title">
          <h2>Sign In</h2>
        </div>
        <div className='sign-in-form'>

          <div className='sign-in-form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' required />
          </div>

          <div className='sign-in-form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' />
          </div>

          <button className='sign-in-btn' onClick={onSignIn}>Sign In</button>
        </div>

        <div className="sign-in-register">
          <p onClick={onRegister}>Register</p>
        </div>
      </div>
    </div>
  )
}


export default SignIn