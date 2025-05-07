import React, { useContext, useEffect } from "react";

import "@fontsource/rum-raisin"; // Defaults to weight 400
import "@fontsource/rum-raisin/400.css"; // Specify weight
import { useNavigate } from "react-router";
import "./Home.css";
import video from "../../assets/images/ecobites.mp4";
import off from "../../assets/images/off.png";
import { UserContext } from "../context/UserContext";
function Home() {
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <div id="home-page">
      <div className="vid-overlay-content">
        <p className="brand">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path
              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 
           10-4.486 10-10S17.514 2 12 2zm0 2c1.26 0 2.448.335 
           3.47.919C14.451 6.28 13 8.933 13 12s1.451 5.72 
           2.47 7.081A7.963 7.963 0 0 1 12 20c-4.411 
           0-8-3.589-8-8s3.589-8 8-8z"
            />
          </svg>
          ecoBites
        </p>

        <div className="bar">
          <button className=" link active">our impact</button>
          <button
            className="link"
            onClick={(e) => (window.location.href = "/")}
          >
            for restaurants
          </button>
        </div>
        <div className="actions">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          {!user && (
            <button
              className="login-btn"
              onClick={() => navigate("/signup", { state: { isLogin: true } })}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <video autoPlay loop muted playsInline className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="landing-container">
        <div className="left-section">
          <div id="planet">
            <p>SAVE MONEY, FOOD,</p>
            <p>
              SAVE THE <span>PLANET</span>
            </p>
          </div>
          <img src={off} alt="..." className="promo-img" />
        </div>

        <div className="right-section">
          <p>
            At ecoBites, our mission is to make great food more accessible by
            offering it at half the price or less, rescuing surplus food nearby,
            and reducing waste to help the environment. We also encourage
            discovering new flavors from local cafes, bakeries, and restaurants
            while making a positive impact on the planet.
          </p>
          <button
            onClick={() => navigate("/signup", { state: { isSignup: true } })}
            id="client-button"
          >
            Sign up as a client
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
