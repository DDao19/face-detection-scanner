import React from 'react'
import './Register.css'


const Register = ({ onSignIn, onRegisterBack }) => {
  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="register-form-title">
          <h2>Register</h2>
        </div>

        <div className="register-form">
          <div className="register-form-group">
            <label htmlFor="fname">First Name</label>
            <input type="text" name='fname' />
          </div>

          <div className="register-form-group">
            <label htmlFor="lname">Last Name</label>
            <input type="text" name='lname' />
          </div>

          <div className="register-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' />
          </div>

          <div className="register-form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' />
          </div>

          <button className='register-btn' onClick={onSignIn}>Register</button>
        </div>

        <div className="register-sign-in">
          <p onClick={onRegisterBack}>Back to Sign In</p>
        </div>
      </div>
    </div>
  )
}


export default Register