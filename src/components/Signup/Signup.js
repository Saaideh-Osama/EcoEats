import React from 'react'
import './Signup.css'
function Signup() {
  return (
    <div id='signup-container'>signup
<form id='signup-form'>
    <h1>Sign Up</h1>
    <input type='email' placeholder='Email' className='signup-inputs' />
    <input type='password' placeholder='Password' className='signup-inputs' />
    <button type='submit' id='signup-button' className='signup-inputs'>Sign Up</button>
    <p>Already have an account? <a href='/'>Login</a></p>
</form>



    </div>
    )
}

export default Signup