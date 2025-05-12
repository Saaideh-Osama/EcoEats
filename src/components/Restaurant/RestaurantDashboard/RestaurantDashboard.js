import { useEffect, useState } from "react";
import axios from "axios";
import Order from "./Order";
import ConfirmModal from "../../Alerts/ConfirmModal";
import AlertModal from "../../Alerts/AlertModal";
import "./RestaurantDashboard.css";
<<<<<<< HEAD
import Meal from "./Meal";
=======
import SoldOutMeal from "./SoldOutMeal";
import MealCard from "../../Client/MealListings/MealCard";
>>>>>>> 867b020abd46fa437db336bc0ea057ce35a56b88

const RestaurantDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
const [showAlertModal, setShowAlertModal] = useState(false);
const [alertMessage, setAlertMessage] = useState("");
const [confirmMessage, setConfirmMessage] = useState("");
const [actionType, setActionType] = useState(null);
const [selectedMeal, setSelectedMeal] = useState(null);

  const [loadingMeals, setLoadingMeals] = useState(true);

<<<<<<< HEAD

  const confirmDelete = (meal) => {
  setSelectedMeal(meal);
  setConfirmMessage(`Are you sure you want to delete meal "${meal.name}" (ID: ${meal.id})?`);
  setActionType("delete");
  setShowConfirmModal(true);
};

  
=======
  const handleDelete = async (mealId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `https://4399-91-186-255-241.ngrok-free.app/api/delete-meal/${mealId}`,
        {}, // <- POST body is empty
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
    } catch (err) {
      console.error("Failed to delete meal", err);
    }
  };
>>>>>>> 867b020abd46fa437db336bc0ea057ce35a56b88

  const fetchMeals = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "https://4399-91-186-255-241.ngrok-free.app/api/restaurant-meals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setMeals(response.data.meals);
    } catch (err) {
      console.error("Error fetching meals:", err);
    } finally {
      setLoadingMeals(false);
    }
  };

 const confirmUpdate = (meal, newQuantity) => {
  setSelectedMeal({ ...meal, newQuantity });
  setConfirmMessage(`Confirm updating "${meal.name}" (ID: ${meal.id}) to quantity ${newQuantity}?`);
  setActionType("update");
  setShowConfirmModal(true);
};
const handleConfirmAction = async () => {
  if (!selectedMeal) return;

  try {
    const token = localStorage.getItem("authToken");

    if (actionType === "delete") {
      await axios.post(
        `https://4399-91-186-255-241.ngrok-free.app/api/delete-meal/${selectedMeal.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setMeals((prev) => prev.filter((meal) => meal.id !== selectedMeal.id));
      setAlertMessage(`Meal "${selectedMeal.name}" (ID: ${selectedMeal.id}) was deleted successfully.`);
    } else if (actionType === "update") {
      const { id, newQuantity } = selectedMeal;
      const response = await axios.post(
        `https://4399-91-186-255-241.ngrok-free.app/api/updateMealQuantity/${id}/${newQuantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const updatedMeal = response.data.meal;
      setMeals((prev) =>
        prev.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))
      );
      setAlertMessage(`Meal "${updatedMeal.name}" (ID: ${updatedMeal.id}) updated to quantity ${updatedMeal.available_count}.`);
    }
  } catch (err) {
    console.error("Error executing action:", err);
    setAlertMessage("An error occurred. Please try again.");
  } finally {
    setShowConfirmModal(false);
    setShowAlertModal(true);
    setSelectedMeal(null);
    setActionType(null);
  }
};


  useEffect(() => {
    fetchMeals();
  }, []);

  
  const fetchReservedOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "https://4399-91-186-255-241.ngrok-free.app/api/restaurant/reserved-orders",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching reserved orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.post(
        `https://4399-91-186-255-241.ngrok-free.app/api/cancel/resturant/orders/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert("Reservation cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling reservation:", err);
    }
  };

  const handlePickup = async (orderId) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.post(
        `https://4399-91-186-255-241.ngrok-free.app/api/order/${orderId}/pickup`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert("Order marked as picked up successfully!");
    } catch (err) {
      console.error("Error marking order as picked up:", err);
    }
  };

  useEffect(() => {
    fetchReservedOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orders-wrapper">
      <h2>Reserved Orders</h2>
      <div className="orders-grid">
        {orders.map((order) => (
          <Order
            key={order.id}
            order={order}
            onCancel={handleCancel}
            onPickup={handlePickup}
          />
        ))}
      </div>
      <div>
<<<<<<< HEAD
     
      {loadingMeals ? (
  <p>Loading meals...</p>
) : meals.length === 0 ? (
  <p>No meals available.</p>
) : (
  <div id="all-meals-container">
    {/* Section for Sold Out Meals */}
     <div id="available-meals-header">
      <h2>Sold out Meals</h2></div>
    <div id="sold-out-meals">
     
     {meals
        .filter((meal) => meal.available_count === 0)
        .map((meal) => (
          <Meal
            key={meal.id}
            meal={meal}
           onQuantityUpdate={(id, newQty) => confirmUpdate(meal, newQty)}
 
          />
        ))}
    </div>

    {/* Section for Available Meals */}
    <div id="available-meals-header">
      <h2>Available Meals</h2></div>
    <div id="available-meals">
      {meals
        .filter((meal) => meal.available_count > 0)
        .map((meal) => (

            <Meal meal={meal}  onDelete={() => confirmDelete(meal)} />

        ))}
    </div>
  </div>
)}

    </div>
     {showConfirmModal && (
  <ConfirmModal
    message={confirmMessage}
    onConfirm={handleConfirmAction}
    onCancel={() => setShowConfirmModal(false)}
  />
)}

{showAlertModal && (
  <AlertModal
    message={alertMessage}
    onClose={() => setShowAlertModal(false)}
  />
)}

=======
        <h2>Meals with Zero Quantity</h2>
        {loadingMeals ? (
          <p>Loading meals...</p>
        ) : meals.length === 0 ? (
          <p>No meals available.</p>
        ) : (
          <div className="all-meals-container">
            {/* Section for Sold Out Meals */}
            <h2>Sold Out Meals</h2>
            <div className="sold-out-meals">
              {meals
                .filter((meal) => meal.available_count === 0)
                .map((meal) => (
                  <SoldOutMeal
                    key={meal.id}
                    meal={meal}
                    onQuantityUpdate={updateMealQuantity}
                  />
                ))}
            </div>

            {/* Section for Available Meals */}
            <h2>Available Meals</h2>
            <div className="available-meals">
              {meals
                .filter((meal) => meal.available_count > 0)
                .map((meal) => (
                  <div key={meal.id} className="meal-with-delete">
                    <MealCard
                      meal={meal}
                      onClick={() => console.log("View or edit", meal.id)}
                    />
                    <button onClick={() => handleDelete(meal.id)}>
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
>>>>>>> 867b020abd46fa437db336bc0ea057ce35a56b88
    </div>
    
  );
 
};

export default RestaurantDashboard;
