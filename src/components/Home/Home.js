import "@fontsource/inter";
import "@fontsource/inter/700.css";
import { useNavigate } from "react-router";
import "./Home.css";
import video from "../../assets/images/ecobites.mp4";
import img from "../../assets/images/test.png";
import off from "../../assets/images/off.png";
import res from "../../assets/images/res.jpg";
import meal from "../../assets/images/meal.jpg";
import order from "../../assets/images/order.jpg";
import veg from "../../assets/images/veg.jpg";
import food from "../../assets/images/food.jpeg";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect,useState } from "react";
import ConfirmModal from "../Alerts/ConfirmModal";
import AlertModal from "../Alerts/AlertModal";
function Home() {
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);
const [showConfirmModal, setShowConfirmModal] = useState(false);
const [showAlertModal, setShowAlertModal] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const [alertType, setAlertType] = useState('success'); // or 'error'
const [confirmAction, setConfirmAction] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
  setConfirmAction(() => () => {
    // Confirmed!
    localStorage.removeItem("authToken");

    // Show alert
    setAlertMessage("You have logged out successfully.");
    setAlertType("success");
    setShowAlertModal(true);

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  });

  setShowConfirmModal(true); // Show the confirmation modal
};


  return (
    <div id="home-page">
      <div className="vid-overlay-content">
        <img src={img} className="home_logo"></img>

        <div className="home_bar">
          <button className=" home_link home_active">our impact</button>
          <button
            className="home_link"
            onClick={(e) => (window.location.href = "res_home")}
          >
            for restaurants
          </button>
        </div>
        <div className="home_actions">
         {user&& (<button className="home_logout_btn" onClick={handleLogout}>
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

      <video autoPlay loop muted playsInline className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="home_landing_container">
        {/* Left Column - Text Content */}
        <div className="home_left_content">
          <div id="planet">
            <p>SAVE MONEY, FOOD,</p>
            <p>
              SAVE THE <span>PLANET</span>
            </p>
          </div>

          <div className="home_description">
            <p>
              At ecoBites, our mission is to make great food more accessible by
              offering it at half the price or less, rescuing surplus food
              nearby, and reducing waste to help the environment. We also
              encourage discovering new flavors from local cafes, bakeries, and
              restaurants while making a positive impact on the planet.
              <span>
                We also help vegetarians to find suitable meals for them
              </span>
            </p>
          </div>
        </div>

        {/* Right Column - Image and Button */}
        <div className="home_right_content">
          <img src={off} alt="50% OFF" className="home_promo_img" />
          <button
            onClick={() => navigate("/signup", { state: { isSignup: true } })}
            id="client-button"
          >
            Sign up as a client
          </button>
        </div>
      </div>
      <div className="home_steps">
        <h2>
          Easy as <span>1,2,3</span>
        </h2>
        <div className="home_steps_grid">
          <div className="home_step">
            <img src={res} />
            <p>browse the meals</p>
          </div>
          <div className="home_step">
            <img src={meal} alt="Step 2" />
            <p>Choose Your favorite meal</p>
          </div>
          <div className="home_step">
            <img src={order} alt="Step 3" />
            <p>Pick up your order</p>
          </div>
        </div>
      </div>
      <div className="home_feedback">
        <h1>said about us!</h1>
        <div className="home_card_slider">
          <div className="home_card">
            <p>
              " never thought I could find affordable meals that are also
              helping reduce food waste. This app changed the way I eat and
              think about leftovers."<span>, University Student</span>{" "}
            </p>
          </div>
          <div className="home_card">
            <p>
              "I love how easy it is to find vegetarian-friendly meals. The app
              even prioritizes them for me—it’s thoughtful and practical!"
              <span>– Lina, Vegetarian User</span>
            </p>
          </div>
          <div className="home_card">
            <p>
              "Sometimes I find meals from my favorite places for half the
              price. It’s like a hidden gem every time!"
              <span>– Khaled, Foodie </span>
            </p>
          </div>
          <div className="home_card">
            <p>
              "Being a single mom on a tight budget, this app has been a
              blessing. Healthy meals without breaking the bank."
              <span>– Noor, Mother of Two</span>
            </p>
          </div>
          <div className="home_card">
            <p>
              "This app helped me save money and discover meals I wouldn’t have
              tried otherwise."
              <span>– Omar, Recent Graduate</span>
            </p>
          </div>
          <div className="home_card">
            <p>
              "As a busy mom, I appreciate the convenience and knowing I’m
              reducing waste."
              <span>– Dalia,</span>
            </p>
          </div>
          <div className="home_card">
            <p>
              "Being a single mom on a tight budget, this app has been a
              blessing. Healthy meals without breaking the bank."
              <span>– Noor, Mother of Two</span>
            </p>
          </div>
        </div>
      </div>
      <div className="home_cards_section">
        <div class="home_container">
          <div class="home_last_card">
            <img src={food} alt="" />
            <div class="home_btncontent">
              <h3>order food</h3>
              <p>delicious meals in affordable price </p>
              <button onClick={(e) => (window.location.href = "/meals")}>
                view meals{" "}
              </button>
            </div>
          </div>

          <div class="home_last_card">
            <img src={veg} alt="" />
            <div class="home_btncontent">
              <h3>vegan food </h3>
              <p>huge collection of the best vegan restaurants </p>
              <button
                onClick={(e) => (window.location.href = "/restaurantslist")}
              >
                view restaurants{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && (
  <ConfirmModal
    message="Are you sure you want to logout?"
    onConfirm={() => {
      setShowConfirmModal(false);
      if (confirmAction) confirmAction();
    }}
    onCancel={() => setShowConfirmModal(false)}
  />
)}

{showAlertModal && (
  <AlertModal
    message={alertMessage}
    type={alertType}
    onClose={() => setShowAlertModal(false)}
  />
)}
    </div>
  );
}

export default Home;
