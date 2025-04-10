import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import "./RestaurantSignup.css";



function RestaurantSignup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [working_hours_from, setWorking_hours_from] = useState("");
    const [working_hours_to, setWorking_hours_to] = useState("");
    const [restaurant_info, setRestaurant_info] = useState("");
    const [role_id, setRole_Id]=useState(3);
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("https://fe4d-91-186-249-228.ngrok-free.app/api/restaurants/register", { email, name, phone_number, password ,restaurant_info,address,working_hours_from,working_hours_to ,role_id }, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("Signup Successful", response.data);
        alert("Signup successful! You can now log in.");

        

        // Redirect to signup/login page with isLogin set to true
        navigate("/signup", { state: { isLogin: true } });
    } catch (err) {
        console.error("Signup Error",err.message);//,err
        alert("Signup failed. Please try again.");
    }}

    
    return (
    
    
<div id="signup-page">
    <div id="signup-box">
        <div id="intro"> 
            <div><p>Sign Up your Business  </p></div>
            <div id="logo-container"></div>
        </div>
        <form onSubmit={handleSubmit} id="form">
        
            <div className="input-group">
                <label className="label">Restaurant Name </label>
                <input autoComplete="off" name="Name"  className="input" type="text"  onChange={(e) => setName(e.target.value)}/>
        <div></div></div>
        
            <div className="input-group">
                <label className="label">Email address</label>
                <input autoComplete="off" name="Email" onChange={(e) => setEmail(e.target.value)} className="input" type="email"/>
        <div></div></div>
        
        <div className="input-group">
                    <label className="label">Password</label>
                    <input autoComplete="off" name="password" onChange={(e) => setPassword(e.target.value)}  className="input" type="password"/>
            <div></div></div>

            <div className="input-group">
                <label className="label">Restaurant address</label>
                <input autoComplete="off" name="address"  onChange={(e) => setAddress(e.target.value)} className="input" type="text"/>
        <div></div></div>
        
            <div className="input-group">
                <label className="label">Phone Number</label>
                <input autoComplete="off" name="phone_number" onChange={(e) => setPhone_number(e.target.value)} className="input" type="number"/>
        <div></div></div>

            <div className="input-group">
                <label className="label">Restaurant info</label>
                <input autoComplete="off" name="restara" onChange={(e) => setRestaurant_info(e.target.value)} className="input" type="text"/>
        <div></div></div>
        
            <div className="input-group">
                <label className="label">Working Hours</label>
                <input autoComplete="off" name="working_hours" onChange={(e) => setWorking_hours_from(e.target.value)} className="input" type="text"/>
        <div></div></div>
            <div className="input-group">
                <label className="label">Working Hours</label>
                <input autoComplete="off" name="working_hours" onChange={(e) => setWorking_hours_to(e.target.value)} className="input" type="text"/>
        <div></div></div>
            
<button className="btn" type="submit">Sign Up</button>
<p id='alreadyhaveacc'>Already have an account ?  <a id="login-page-link"  onClick={() => navigate("/signup", { state: { isLogin: true } })} >Log in </a> </p>
                
            </form>
            
        
        
        </div>
        </div>
    );
};




export default RestaurantSignup