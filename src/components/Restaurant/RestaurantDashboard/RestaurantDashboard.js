import { useEffect, useState } from "react";
import axios from "axios";
import Order from "./Order";
import ConfirmModal from "../../Alerts/ConfirmModal";
import AlertModal from "../../Alerts/AlertModal";
import "./RestaurantDashboard.css";
import Meal from "./Meal";

const RestaurantDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(true);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [confirmMessage, setConfirmMessage] = useState("");
  const [actionType, setActionType] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // === FETCH MEALS ===
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

  const confirmDelete = (meal) => {
    setSelectedMeal(meal);
    setConfirmMessage(
      `Are you sure you want to delete meal "${meal.name}" (ID: ${meal.id})?`
    );
    setActionType("delete");
    setShowConfirmModal(true);
  };

  const confirmUpdate = (meal, newQuantity) => {
    setSelectedMeal({ ...meal, newQuantity });
    setConfirmMessage(
      `Confirm updating "${meal.name}" (ID: ${meal.id}) to quantity ${newQuantity}?`
    );
    setActionType("update");
    setShowConfirmModal(true);
  };

  // === HANDLE CONFIRM ===
  const confirmCancel = (order) => {
  setSelectedOrder(order);
  setConfirmMessage(
    `Are you sure you want to cancel reservation for Order ID ${order.id} with quantity ${order.quantity}?`
  );
  setActionType("cancel");
  setShowConfirmModal(true);
};
  const handleConfirmAction = async () => {
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
        setAlert({
          show: true,
          message: `Meal "${selectedMeal.name}" (ID: ${selectedMeal.id}) was deleted successfully.`,
          type: "success",
        });
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
        setAlert({
          show: true,
          message: `Meal "${updatedMeal.name}" (ID: ${updatedMeal.id}) updated to quantity ${updatedMeal.available_count}.`,
          type: "success",
        });
      } else if (actionType === "pickup") {
        await axios.post(
          `https://4399-91-186-255-241.ngrok-free.app/api/order/${selectedOrder.id}/pickup`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        setOrders((prev) =>
          prev.filter((order) => order.id !== selectedOrder.id)
        );
        setAlert({
          show: true,
          message: `Order ID ${selectedOrder.id} with quantity ${selectedOrder.quantity} marked as picked up.`,
          type: "success",
        });
      }
       else if (actionType === "cancel") {
  const token = localStorage.getItem("authToken");

  await axios.post(
    `https://4399-91-186-255-241.ngrok-free.app/api/cancel/resturant/orders/${selectedOrder.id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    }
  );

  setOrders((prev) =>
    prev.filter((order) => order.id !== selectedOrder.id)
  );
  setAlert({
    show: true,
    message: `Order ID ${selectedOrder.id} cancelled successfully!`,
    type: "success",
  });
}
    } catch (err) {
      console.error("Error during action:", err);
      setAlert({
        show: true,
        message: "An error occurred. Please try again.",
        type: "failed",
      });
    } finally {
      setShowConfirmModal(false);
      setShowAlertModal(true);
      setSelectedMeal(null);
      setSelectedOrder(null);
      setActionType(null);
    }
  };

  // === FETCH RESERVED ORDERS ===
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

  // === CANCEL ORDER ===
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
      setAlert({
        show: true,
        message: "Reservation cancelled successfully!",
        type: "success",
      });
      setShowAlertModal(true);
    } catch (err) {
      console.error("Error cancelling reservation:", err);
    }
  };

  // === HANDLE PICKUP ===
  const handlePickup = (order) => {
    setSelectedOrder(order);
    setActionType("pickup");
    setConfirmMessage(
      `Are you sure you want to mark order ID ${order.id} with quantity ${order.quantity} as picked up?`
    );
    setShowConfirmModal(true);
  };

  useEffect(() => {
    fetchMeals();
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
            onCancel={()=>confirmCancel(order)}
            onPickup={() => handlePickup(order)}
          />
        ))}
      </div>

      <div>
        {loadingMeals ? (
          <p>Loading meals...</p>
        ) : meals.length === 0 ? (
          <p>No meals available.</p>
        ) : (
          <div id="all-meals-container">
            <div id="available-meals-header">
              <h2>Sold out Meals</h2>
            </div>
            <div id="sold-out-meals">
              {meals
                .filter((meal) => meal.available_count === 0)
                .map((meal) => (
                  <Meal
                    key={meal.id}
                    meal={meal}
                    onQuantityUpdate={(id, newQty) =>
                      confirmUpdate(meal, newQty)
                    }
                  />
                ))}
            </div>

            <div id="available-meals-header">
              <h2>Available Meals</h2>
            </div>
            <div id="available-meals">
              {meals
                .filter((meal) => meal.available_count > 0)
                .map((meal) => (
                  <Meal
                    key={meal.id}
                    meal={meal}
                    onDelete={() => confirmDelete(meal)}
                  />
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
          message={alert.message}
          type={alert.type}
          onClose={() => setShowAlertModal(false)}
        />
      )}
    </div>
  );
};

export default RestaurantDashboard;
