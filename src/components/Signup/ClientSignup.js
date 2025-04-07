import React, { useState } from 'react';
import './ClientSignup.css';
import axios from 'axios';
import logo from '../../assets/images/logo.png';


function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [password, setPassword] = useState("");
    const [is_vegetarian, setIs_vegetarian] = useState("");
    const [roleid, setRoleid] = useState("2");
    const [loading, setLoading] = useState(false);
    const handleChange = (event) => { setIs_vegetarian(event.target.value); };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    const phoneRegex = /^(078|077|079)\d{7}$/; // Must start with 078, 077, or 079 and be 10 digits long
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // At least 8 characters & at least 1 uppercase letter
    


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload

        if (is_vegetarian === null){
            setIs_vegetarian(0);
        }
        if(roleid === null){
            setRoleid(1);
        }
        setLoading(true); // Indicate loading

        const userData = {
            name,
            phone_number,
            email,
            password,
            is_vegetarian,
            role_id:roleid
        };
        
        try {
            const response = await axios.post("https://87e9-92-241-35-12.ngrok-free.app/api/clients/register", userData, {
                headers: { "Content-Type": "application/json" },
            });
            
            console.log("Signup successful:", response.data);
            alert("Signup successful!");
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            alert("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="signup-page">
        <div id="signup-container">
            <div id='left-part'>
                <p id='clientsignup-form-title'>Create an account</p>
                <form id='client-signup-form' onSubmit={handleSubmit}>
            
                <div className="signup-input-container">
<input placeholder="Enter Name" className="signup-input-field" type="text" onChange={(e) => setName(e.target.value)} />
<label htmlFor="input-field" className="signup-input-label">Enter Name</label>
<span className="signup-input-highlight"></span>
</div>
                <div className="signup-input-container">
<input placeholder="Enter Email" className="signup-input-field" type="text" onChange={(e) => setEmail(e.target.value)} />
<label htmlFor="input-field" className="signup-input-label">Enter Email</label>
<span className="signup-input-highlight"></span>
</div>
                <div className="signup-input-container">
<input placeholder="Enter Phone Number" className="signup-input-field" type="number" onChange={(e) => setPhone_number(e.target.value)} />
<label htmlFor="input-field" className="signup-input-label">Enter Phone Number</label>
<span className="signup-input-highlight"></span>
</div>
                <div className="signup-input-container">
<input placeholder="Enter Password" className="signup-input-field" type="text" onChange={(e) => setPassword(e.target.value)} />
<label htmlFor="input-field" className="signup-input-label">Enter Password</label>
<span className="signup-input-highlight"></span>
</div>
<div className="signup-input-container">

<label htmlFor="dropdown">Diet system:</label>
  <select 
    id="dropdown" 
    value={is_vegetarian} 
    onChange={handleChange}
  >

    <option value="0">omnivore</option>
    <option value="1">vegetarian</option>
    
  </select>
  
  
</div>

<button class="btn" type="submit">Signup</button>


                </form>

                <div id='alreadyhaveacc'> 
                    <p>Already have an account?</p> &nbsp;<a href='/'>Log in</a>
                </div>
            </div>

           
        </div>
    </div>
      
    );
}

export default Signup;
