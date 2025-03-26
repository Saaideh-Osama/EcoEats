import React, { useState } from "react";

import axios from "axios";
import logo from '../../assets/images/logo.png';
import login from '../../assets/images/dose-juice-ocnsb17U6FE-unsplash.jpg';
import "./Login.css";

function Login() {

 //Context-object

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 

 const handleSubmit = async (e) => {

    e.preventDefault();
  try{
    const response = await axios.post(
      "https://87e9-92-241-35-12.ngrok-free.app/api/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    console.log("Login Successful", response.data);
  }
  catch(err){
    console.error("Login Error", err);
    setError(err.response?.data?.message || "Login failed");
}
  }


return (
<div id='login-container' > 

  <div id='bg-image' >
    <img src={logo} alt="company logo" id="bg-logo" />
</div>
  <div id='form-part' > 
  
    <form onSubmit={handleSubmit} id="login-form" >
    <img src={logo} alt="company logo" id="logo" />
       
    <div className="input-container">
  <input placeholder="Enter Email" className="input-field" type="text" onChange={(e) => setEmail(e.target.value)} />
  <label for="input-field" className="input-label">Enter Email</label>
  <span className="input-highlight"></span>
  </div>
  <div className="input-container">
  <input placeholder="Enter Password" class="input-field" type="password"  onChange={(e) => setPassword(e.target.value)}/>
  <label for="input-field" className="input-label">Enter Password</label>
  <span className="input-highlight"></span>
  </div>
 
  <button className="btn" type="submit">Login</button>
<p id="alrdy">Don't have an account ? <a href="/" id="signup">Sign up </a></p>
    </form>
  </div>
  
 
</div>
  );}

export default Login;

