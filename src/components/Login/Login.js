import React from 'react'
import './Login.css'

function Login() {
  return (
    <div className='Login-container'>
        <form className='Login-form'>
            <h1>Login</h1>
            <input type='text' placeholder='Username' className='login-inputs' />        
            <input type='password' placeholder='Password' className='login-inputs'/>
            <button type='submit' id='login-button' className='login-inputs'>Login</button>
            <p>Don't have an account? <a href='/signup'>Sign up</a></p>
            
            </form>





    </div>
  )
}

export default Login