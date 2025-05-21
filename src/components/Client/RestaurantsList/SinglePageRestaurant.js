import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import "./SinglePageRestaurant.css";
import Meals from "../MealListings/Meals";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import img from "../../../assets/images/rest-logo3.jpg";
import MealCard from "../MealListings/MealCard";
import MealPopUp from "../MealListings/MealPopUp";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import AlertModal from "../../Alerts/AlertModal";
import ConfirmModal from "../../Alerts/ConfirmModal";
import Navbar from "../../Navbar/Navbar";
const SinglePageRestaurant = () => {
  const { user, fetchUser } = useContext(UserContext);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupLoading, setPopupLoading] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [openpopup, setOpenpopup] = useState(false);
  const [orderquantity, setOrderquantity] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [showAlert, setShowAlert] = useState(false);
const [activeTab, setActiveTab] = useState("");




  const navigate = useNavigate();
  const fetchMealDetails = async (mealId) => {
    try {
      setPopupLoading(true);
      setPopupContent(null);

      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/meals/${mealId}`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const meal = response.data.meal;

      setPopupContent({
        ...meal,
        restaurant_name: restaurant?.name || "Unknown Restaurant",
      });
    } catch (error) {
      console.error("Error fetching meal details:", error);
      setPopupContent(null);
    } finally {
      setPopupLoading(false);
    }
  };

  const fetchRestaurantDetails = async () => {
    try {
      const response = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/restaurant/info/${id}`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setRestaurant(response.data.restaurant_info);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  const fetchRestaurantMeals = async () => {
    try {
      const response = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/restaurant-meals/${id}`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setMeals(response.data.meals);
    } catch (error) {
      console.error("Error fetching restaurant meals:", error);
    }
  };
  const handleDecrement = () => {
    setOrderquantity((prev) => Math.max(prev - 1, 1)); // prevents going below 1
  };
  const handleIncrement = () => {
    setOrderquantity((prev) =>
      Math.min(prev + 1, popupContent.available_count)
    ); // prevents going above available count
  };
  const handlePlaceOrder = (e) => {
     
    setShowConfirm(true);
  };

const placeOrder = async (e) => {
 
  try {
    console.log("Placing order...");
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      "https://4399-91-186-255-241.ngrok-free.app/api/place-order",
      {
        meal_id: popupContent.id,
        quantity: orderquantity,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    setShowConfirm(false); // hide confirmation
    setAlertMessage(`Order placed successfully! You ordered ${orderquantity} x ${popupContent.name}.`);
    setAlertType("success");
    setShowAlert(true);
  } catch (error) {
    setShowConfirm(false);
    if (error.response?.status === 401) {
      setAlertMessage("You need to be logged in first to reserve a meal.");
    } else {
      setAlertMessage("Failed to place order. Please try again.");
    }
    setAlertType("error");
    setShowAlert(true);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRestaurantDetails();
      await fetchRestaurantMeals();
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div>
     <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={`restaurant-page ${openpopup ? "blurred" : ""}`}>
        <div className="restaurant-banner">
          <img src={restaurant.image} alt="Restaurant" />
          <div className="restaurant-info-box">
            <p className="about">{restaurant.restaurant_info}</p>
            <p>
              <FaLocationDot id="locationIcon"/> {restaurant.address}
            </p>
            <p>
              <FaPhoneAlt id="phoneIcon"/> {restaurant.phone_number}
            </p>
            <p>
              <GoClock id="clockIcon"/> {restaurant.working_hours_from} -{" "}
              {restaurant.working_hours_to}
            </p>
          </div>
        </div>

        <div className="meals-section">
          <h2>Meals from {restaurant.name}</h2>
          <div className="meals-grid">
            {meals.length > 0 ? (
              meals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onClick={() => {
                    setOpenpopup(true);
                    fetchMealDetails(meal.id);
                  }}
                />
              ))
            ) : (
              <p>No meals found</p>
            )}
          </div>
        </div>
      </div>
      {openpopup && (
        <MealPopUp
          open={openpopup}
          meal={popupContent}
          onClose={() => {
            setOpenpopup(false);
            setOrderquantity(1);
          }}
          orderQuantity={orderquantity}
          setOrderquantity={setOrderquantity}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handlePlaceOrder={handlePlaceOrder}
          loading={popupLoading}
        />
      )}
       {showConfirm && (
        <ConfirmModal
          message={`Are you sure you want to order ${orderquantity} x "${popupContent?.name}"?`}
          show={showConfirm}
          onConfirm={placeOrder}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Alert Modal */}
      {showAlert && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default SinglePageRestaurant;
