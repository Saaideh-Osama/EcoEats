import React, { useState } from "react";
import axios from "axios";
import logo from '../../assets/images/logo.png';
import loginBg from '../../assets/images/dose-juice-ocnsb17U6FE-unsplash.jpg';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://9965-91-186-251-83.ngrok-free.app/api/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      
      console.log("Login Successful", response.data);
      // Handle successful login (redirect, store token, etc.)
      
    } catch (err) {
      console.error("Login Error", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-page">
      <div id='login-container'>
       
        
        <div id='form-part'>
          <img src={logo} alt="Logo" id="logo" />
          
          <form onSubmit={handleSubmit} id="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-container">
              <input 
                placeholder="Enter Email" 
                className="input-field" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
              <label htmlFor="input-field" className="input-label">Enter Email</label>
              <span className="input-highlight"></span>
            </div>
            
            <div className="input-container">
              <input 
                placeholder="Enter Password" 
                className="input-field" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="input-field" className="input-label">Enter Password</label>
              <span className="input-highlight"></span>
            </div>
            
            <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            
            <p id="alrdy">
              Don't have an account? <a href="/signup" id="signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;