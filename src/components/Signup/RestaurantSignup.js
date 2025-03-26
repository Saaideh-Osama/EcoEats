import { useState } from "react";
import axios from 'axios';
import logo from "../../assets/images/logo.png";
import "./RestaurantSignup.css";



function RestaurantSignup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [password, setPassword] = useState("");
    
    const [address, setAddress] = useState("");
    const [working_hours, setWorking_hours] = useState("");
    const [restaurant_info, setRestaurant_info] = useState("");
    const [role_id, setRole_Id]=useState(3);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("https://9965-91-186-251-83.ngrok-free.app/api/restaurants/register", { email, name, phone_number, password ,restaurant_info,address,working_hours ,role_id }, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("Signup Successful", response.data);
        alert("Signup successful! You can now log in.");
    } catch (err) {
        console.error("Signup Error",err.message);//,err
        alert("Signup failed. Please try again.");
    }}

    
    return (
    
    
<div id="singnup-page">
    <div id="signup-box">
        <div id="intro"> 
            <div><p>Sign Up your Business  </p></div>
            <div id="logo-container"><img src={logo} alt="logo" id="logo"/></div>
        </div>
        <form onSubmit={handleSubmit} id="form">
        
            <div className="input-group">
                <label className="label">Restaurant Name </label>
                <input autocomplete="off" name="Name"  className="input" type="text"  onChange={(e) => setName(e.target.value)}/>
        <div></div></div>
        
            <div className="input-group">
                <label className="label">Email address</label>
                <input autocomplete="off" name="Email" onChange={(e) => setEmail(e.target.value)} className="input" type="email"/>
        <div></div></div>
        
        <div className="input-group">
                    <label className="label">Password</label>
                    <input autocomplete="off" name="password" onChange={(e) => setPassword(e.target.value)}  className="input" type="password"/>
            <div></div></div>

            <div className="input-group">
                <label className="label">Restaurant address</label>
                <input autocomplete="off" name="address"  onChange={(e) => setAddress(e.target.value)} className="input" type="text"/>
        <div></div></div>
        
            <div className="input-group">
                <label className="label">Phone Number</label>
                <input autocomplete="off" name="phone_number" onChange={(e) => setPhone_number(e.target.value)} className="input" type="number"/>
        <div></div></div>
        
            <div className="input-group">
                <label className="label">Working Hours</label>
                <input autocomplete="off" name="working_hours" onChange={(e) => setWorking_hours(e.target.value)} className="input" type="text"/>
        <div></div></div>
            
<button className="btn" type="submit">Sign Up</button>
<p>Already have an account ?  <a href="/" id="login-page-link">Log in </a> </p>
                
            </form>
            
        
        
        </div>
        </div>
    );
};




export default RestaurantSignup