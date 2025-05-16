import { useEffect } from "react";
import { MdOutlineClose, MdRestaurant } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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

  if (!open) return null;

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
                  try {
                    await handlePlaceOrder(); // Wait for successful order
                     // Navigate after success
                  } catch (error) {
                    console.error("Order failed:", error);
                  }
                }}
              >
                Order
              </button>
            </div>
            
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
