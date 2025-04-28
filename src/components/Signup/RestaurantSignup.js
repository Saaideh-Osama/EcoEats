import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import HourDropdown from "./HourDropdown"; // adjust path if needed
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
  const [license_url, setLicense_url] = useState(null);
  const [role_id] = useState(3); // default to 3

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("restaurant_info", restaurant_info);
    formData.append("working_hours_from", working_hours_from);
    formData.append("working_hours_to", working_hours_to);
    formData.append("role_id", role_id);
    
    if (license_url) {
      formData.append("license_url", license_url); // ✅ Now it's a real file object
    }
    
    console.log("Form submitted with values:", formData);
    console.log("Image file:",license_url);
    try {
      const response = await axios.post(
        "https://ad67-91-186-251-160.ngrok-free.app/api/restaurants/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Signup Successful", response.data);
      alert("Signup successful! You can now log in.");

      navigate("/signup", { state: { isLogin: true } });
    } catch (err) {
      console.error("Signup Error", err.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div id="signup-page">
      <div id="signup-box">
        <div id="intro">
          <div><p>Sign Up your Business</p></div>
          <div id="logo-container"></div>
        </div>
        <form onSubmit={handleSubmit} id="form">
          <div className="input-group">
            <label className="label">Restaurant Name</label>
            <input autoComplete="off" name="name" className="input" type="text" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-group">
            <label className="label">Email address</label>
            <input autoComplete="off" name="email" className="input" type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label className="label">Password</label>
            <input autoComplete="off" name="password" className="input" type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="input-group">
            <label className="label">Restaurant address</label>
            <input autoComplete="off" name="address" className="input" type="text" onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="input-group">
            <label className="label">Phone Number</label>
            <input autoComplete="off" name="phone_number" className="input" type="number" onChange={(e) => setPhone_number(e.target.value)} />
          </div>

          <div className="input-group">
            <label className="label">Restaurant info</label>
            <input autoComplete="off" name="restaurant_info" className="input" type="text" onChange={(e) => setRestaurant_info(e.target.value)} />
          </div>

          <div className="input-group">
            <label className="label">Working Hours</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <HourDropdown
                name="working_hours_from"
                value={working_hours_from}
                onChange={(e) => setWorking_hours_from(e.target.value)}
              />
              <span>to</span>
              <HourDropdown
                name="working_hours_to"
                value={working_hours_to}
                onChange={(e) => setWorking_hours_to(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="label">Restaurant Image</label>
            <input type="file" accept="image/*" onChange={(e) => setLicense_url(e.target.files[0])} /> 
          </div>

          {license_url && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={URL.createObjectURL(license_url)}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px" }}
              />
            </div>
          )}

          <button className="res-signup-btn" type="submit">Sign Up</button>
          <p id='alreadyhaveacc'>
            Already have an account?{" "}
            <a id="login-page-link" onClick={() => navigate("/signup", { state: { isLogin: true } })}>Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RestaurantSignup;
