import { useEffect,useContext, useState } from "react";
import { MdOutlineClose, MdRestaurant } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CustomAlert from "../../Alerts/CustomAlert";
import "./MealPopup.css";

const MealPopup = ({
  open,
  onClose,
  meal,
  orderQuantity,
  setOrderquantity,
  handleDecrement,
  handleIncrement,
  handlePlaceOrder,
  loading,
}) => {
  const navigate = useNavigate();
const { user, fetchUser, loading: userLoading } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
useEffect(() => {
  const init = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No token found, user not logged in.");
      return;
    }

    try {
      console.log("Token found, fetching user data...");
      await fetchUser();
    } catch (error) {
      console.log("Failed to fetch user:", error);
    }
  };
  init();
}, []);

if (!open || userLoading) return null;
 

  return (
    <div id="popup-overlay">
      <div id="popup-content">
        {loading || !meal ? (
          <p>Loading...</p>
        ) : (
          <>
            <div id="image-container">
              <img src={meal.image} alt={meal.name} />
            </div>
            <h3 className="meal-title">{meal.name}</h3>
            <div className="restaurant-info">
              <MdRestaurant className="restaurant-icon" />
              <span> {meal.restaurant_name}</span>
            </div>
            <p class="meals-left-info">Left: {meal.available_count}</p>

            <hr className="separator" />
            <div className="ingredients-section">
              <span className="ingredients-label">Ingredients:</span>
              <p className="ingredients-text">{meal.description}</p>
            </div>
            <div className="price-quantity-section">
              <div className="quantity-controls">
                <span className="quantity-label">Quantity:</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrement();
                  }}
                >
                  -
                </button>
                <span className="quantity-value">{orderQuantity}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncrement();
                  }}
                >
                  +
                </button>
              </div>
              <div className="price">
                {(meal.price * orderQuantity).toFixed(2)} JOD           
              </div>
            </div>
            <p
              style={{
                backgroundColor:
                  meal.contains_chicken === 0 && meal.contains_meat === 0
                    ? "orange"
                    : "gray",
                padding: "4px 12px",
                borderRadius: "6px",
                color: "#333",
                fontWeight: "bold",
                width: "fit-content",
                position: "absolute",
                top: "220px",
                right: "24px",
              }}
            >
              {meal.contains_chicken === 0 && meal.contains_meat === 0
                ? "Vegetarian"
                : "Contains Meat or Chicken"}
            </p>

            <div className="order-btn-container">
              <button
                id="orderBTN"
                onClick={async (e) => {
                  e.stopPropagation();
                  
                  if (!user) {
                    setShowAlert(true);
                    return;
                  }

                  try {
                    await handlePlaceOrder();
                  } catch (error) {
                    console.error("Order failed:", error);
                  }
                }}
              >
                Order
              </button>
            </div>
            {showAlert && (
              <CustomAlert
                message="You must be logged in to place an order."
                onClose={() => setShowAlert(false)}
              />
            )}
          </>
        )}
      </div>
      <button onClick={onClose} id="close-popup">
        <MdOutlineClose />
      </button>
    </div>
  );
};

export default MealPopup;
