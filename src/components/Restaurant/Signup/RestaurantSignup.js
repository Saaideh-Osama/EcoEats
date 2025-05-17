import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HourDropdown from "./HourDropdown";
import "./RestaurantSignup.css";

function RestaurantSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // step 1 or 2

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [working_hours_from, setWorking_hours_from] = useState("");
  const [working_hours_to, setWorking_hours_to] = useState("");
  const [restaurant_info, setRestaurant_info] = useState("");
  const [license_url, setLicense_url] = useState(null);
  const [logo_url, setLogo_url] = useState(null);
  const [role_id] = useState(3);

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

    if (license_url) formData.append("license_url", license_url);
    if (logo_url) formData.append("logo_url", logo_url);

    try {
      const response = await axios.post(
        "https://4399-91-186-255-241.ngrok-free.app/api/restaurants/register ",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Signup successful! You can now log in.");
      navigate("/signup", { state: { isLogin: true } });
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div id="signup-page">
      <div id="signup-box">
        <div id="intro">
          <div>
            <p>Sign Up your Business</p>
          </div>
          <div id="logo-container"></div>
        </div>

        <form id="form" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="input-group">
                <label className="label">Restaurant Name</label>
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="label">Email address</label>
                <input
                  className="input"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="label">Restaurant address</label>
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="label">Phone Number</label>
                <input
                  className="input"
                  type="number"
                  onChange={(e) => setPhone_number(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="label">Restaurant info</label>
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setRestaurant_info(e.target.value)}
                />
              </div>

              <div className="button-container">
                <button
                  type="button"
                  className="res-signup-btn"
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="input-group">
                <label className="label">Working Hours</label>
                <div className="working-hours-container">
                  <HourDropdown
                    name="from"
                    value={working_hours_from}
                    onChange={(e) => setWorking_hours_from(e.target.value)}
                  />
                  <span>to</span>
                  <HourDropdown
                    name="to"
                    value={working_hours_to}
                    onChange={(e) => setWorking_hours_to(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group file-upload">
                <label className="label">Restaurant licence</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLicense_url(e.target.files[0])}
                />
              </div>

              {license_url && (
                <img
                  src={URL.createObjectURL(license_url)}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    gridColumn: "1 / -1",
                  }}
                />
              )}

              <div className="input-group file-upload">
                <label className="label">Restaurant logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogo_url(e.target.files[0])}
                />
              </div>

              {logo_url && (
                <img
                  src={URL.createObjectURL(logo_url)}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    gridColumn: "1 / -1",
                  }}
                />
              )}

              <div className="button-container">
                <button
                  type="button"
                  className="res-signup-btn"
                  onClick={() => setStep(1)}
                  style={{
                    backgroundColor: " white",
                    color: "#0066a0",
                    borderRadius: "10px",
                    borderStyle: "solid",
                    borderColor: "#0066a0",
                    boxShadow: "0 10px 20px -6px rgba(22, 33, 79, 0.5)",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    width: "120px",
                    height: "50px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Back
                </button>
                <button className="res-signup-btn" type="submit">
                  Sign Up
                </button>
              </div>

              <p id="alreadyhaveacc">
                Already have an account?{" "}
                <a
                  id="login-page-link"
                  onClick={() =>
                    navigate("/signup", { state: { isLogin: true } })
                  }
                >
                  Log in
                </a>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default RestaurantSignup;
