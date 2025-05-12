import { useEffect, useState } from "react";
import axios from "axios";
import Order from "./Order";
import "./RestaurantDashboard.css";
import SoldOutMeal from "./SoldOutMeal";
import MealCard from "../../Client/MealListings/MealCard";

const RestaurantDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(true);

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

  const updateMealQuantity = async (mealId, newQuantity) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `https://4399-91-186-255-241.ngrok-free.app/api/updateMealQuantity/${mealId}/${newQuantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      // Update the meal in local state
      const updatedMeal = response.data.meal;
      setMeals((prev) =>
        prev.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))
      );
    } catch (err) {
      console.error("Error updating meal quantity:", err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const soldoutmeals = meals.filter((meal) => meal.available_count === 0);
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
    </div>
  );
};

export default RestaurantDashboard;
