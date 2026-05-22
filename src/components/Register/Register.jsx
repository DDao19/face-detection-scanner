import React, { useState } from 'react'
import ErrorMsg from '../ErrorMsg/ErrorMsg'
import './Register.css'


const Register = ({ onRouteChange, loadUser }) => {

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registerErrorMsg, setRegisterErrorMsg] = useState('')

  const onFnameChange = (e) => {
    setFname(e.target.value)
  }

  const onLnameChange = (e) => {
    setLname(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmitRegister = async () => {
    try {
      if (fname.length && lname.length && email.length && password.length) {
        const registerData = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: '03',
            firstName: fname,
            lastName: lname,
            email: email,
            password: password
          })
        })
        const response = await registerData.json()
        const data = await response
        
        if (data != "Error: unable to register") {
          loadUser(data)
          onRouteChange('home')
        } else {
          console.log("Failed to register")
          setRegisterErrorMsg("Someone with that email already exists. Please use a different email.")
        }

      } else {
        setRegisterErrorMsg("Please fill out each section")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="register-container">
      <div className="register-form-container">

        <div className="register-form-title">
          <h2>Register</h2>
        </div>

        {registerErrorMsg.length ? <ErrorMsg error={registerErrorMsg} /> : null}

        <div className="register-form">
          <div className="register-form-group">
            <label htmlFor="fname">First Name</label>
            <input type="text" name='fname' onChange={onFnameChange} />
          </div>

          <div className="register-form-group">
            <label htmlFor="lname">Last Name</label>
            <input type="text" name='lname' onChange={onLnameChange} />
          </div>

          <div className="register-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={onEmailChange} />
          </div>

          <div className="register-form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={onPasswordChange} />
          </div>

          <button className='register-btn' onClick={onSubmitRegister}>Register</button>
          {/* <button className='register-btn' onClick={onSignIn}>Register</button> */}
        </div>

        <div className="register-sign-in">
          <p onClick={() => {onRouteChange('signin')}} >Back to Sign In</p>
        </div>
      </div>
    </div>
  )
}


export default Register