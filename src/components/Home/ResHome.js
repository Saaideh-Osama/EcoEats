import React, { useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import logo from "../../assets/images/test.png";
import img from "../../assets/images/why .jpg";
import two from "../../assets/images/steptwo.png";
import one from "../../assets/images/one.png";
import three from "../../assets/images/three.jpg";
import AlertModal from "../Alerts/AlertModal";
import ConfirmModal from "../Alerts/ConfirmModal";
import "./ResHome.css";

function ResHome() {
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);
  
   const [showConfirm, setShowConfirm] = useState(false);
   const [confirmationMessage, setConfirmationMessage] = useState("");
   const [alertMessage, setAlertMessage] = useState("");
   const [alertType, setAlertType] = useState("");
   const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);
const handleLogout = () => {
    setConfirmationMessage("Are you sure you want to logout?");
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    setShowConfirm(false);
    setShowAlert(true);
    navigate("/",{ state :{refresh:true}});
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };


  return (
    <>
      <div className="vid-overlay-content">
        <img src={logo} className="home_logo"></img>

        <div className="home_bar">
          <button
            className=" home_link "
            onClick={(e) => (window.location.href = "/")}
          >
            our impact{" "}
          </button>
          <button className="home_link home_active">for restaurants</button>
        </div>
        <div className="home_actions">
         {user && (<button className="home_logout_btn" onClick={handleLogout}>
            Logout
          </button>)}
          {!user && (
            <button
              className="home_login_btn"
              onClick={() => navigate("/signup", { state: { isLogin: true } })}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className="img_part">
        <img src={img} className="background-image" alt="ecoBites promo" />
        <div className="ResHome-content">
          <h3>Why Join Us?</h3>
          <p>
            Our mission is to support restaurants and make the most out of every
            fresh meal, Reduce Waste & Boost Profit by Selling surplus food
            instead of throwing it away and turn leftovers into extra income.
          </p>
          <button
            onClick={() => navigate("/resignup", { state: { isSignup: true } })}
            className="rest-button"
          >
            sign up as restaurant
          </button>
        </div>
      </div>
      <div className="features-container">
        <div className="feature">
          <div className="feature-text">
            <h3>1.Sign up</h3>
            <p>Create a restaurant account with your details.</p>
          </div>
          <div className="circle-img">
            <img src={one} />
          </div>
        </div>

        <div className="feature">
          <div className="circle-img">
            <img src={two} />
          </div>
          <div className="feature-text">
            <h3>2.Add meals</h3>
            <p>Upload your available meals with photos and details.</p>
          </div>
        </div>

        <div className="feature full-row">
          <div className="feature-text">
            <h3>3.Use the dashboard</h3>
            <p>View and manage customer orders, your meals and pickup times</p>
          </div>
          <div className="circle-img">
            <img src={three} />
          </div>
        </div>
      </div>

      <div className="home_feedback">
        <h1>most requested </h1>
        <div className="home_card_slider">
          <div className="home_card">
            <p>
              "Do I need to handle delivery?"
              <span>
                – "No, customers come to pick up the meal. You don’t need to
                worry about delivery logistics.",
              </span>{" "}
            </p>
          </div>

          <div className="home_card">
            <p>
              "How is this different from food donation?",
              <span>
                – "This platform lets you sell surplus meals at a low price
                instead of donating them, helping you recover some costs while
                reducing food waste.",
              </span>
            </p>
          </div>
          <div className="home_card">
            <p>
              "What happens when someone reserves a meal?"
              <span>
                {" "}
                – "You’ll see a reservation in your dashboard with customer
                details and can manage the pickup status easily.",
              </span>
            </p>
          </div>

          <div className="home_card">
            <p>
              "What happens when a meal runs out?"
              <span>
                – "Meals with zero quantity are automatically marked as sold out
                and hidden from the public listing.",
              </span>
            </p>
          </div>
          <div className="home_card">
            <p>
              "Can I delete a meal?",
              <span>– sure!</span>
            </p>
          </div>
        </div>
         {showConfirm && (
          <ConfirmModal
            message="Are you sure you want to logout?"
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
          />
        )}
        {showAlert && (
          <AlertModal
            type="success"
            message="You have been logged out successfully."
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
    </>
  );
}
export default ResHome;
