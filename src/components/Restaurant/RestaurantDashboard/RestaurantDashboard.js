import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ConfirmModal from "../../Alerts/ConfirmModal";
import AlertModal from "../../Alerts/AlertModal";
import "./RestaurantDashboard.css";
import MealListings from "./MealListings";
import ReservedOrders from "./ReservedOrders";
import Navbar from "../../Navbar/Navbar";
import CreateMeal from "./CreateMeal";
import { UserContext } from "../../context/UserContext";

const RestaurantDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingMeals, setLoadingMeals] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [confirmMessage, setConfirmMessage] = useState("");
  const [actionType, setActionType] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("mealListings");
  const { user, fetchUser } = useContext(UserContext);
  const token = localStorage.getItem("authToken");
  const renderTabContent = () => {
    switch (activeTab) {
      case "addmeal":
        return <CreateMeal />;
      case "mealListings":
        return (
          <MealListings
            meals={meals}
            loading={loadingMeals}
            onDelete={confirmDelete}
            onUpdateQuantity={confirmUpdate}
          />
        );
      case "reservedOrders":
        return (
          <ReservedOrders
            orders={orders}
            loading={loadingOrders}
            onCancel={confirmCancel}
            onPickup={confirmPickup}
          />
        );
      default:
        return null;
    }
  };
  const fetchMeals = async () => {
    try {
      const response = await axios.get(
        "https://3cfd-91-186-247-216.ngrok-free.app/api/restaurant-meals",
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

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://3cfd-91-186-247-216.ngrok-free.app/api/restaurant/reserved-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleConfirmAction = async () => {
    try {
      if (actionType === "delete") {
        await axios.post(
          `https://3cfd-91-186-247-216.ngrok-free.app/api/delete-meal/${selectedMeal.id}`,
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
          message: `Meal "${selectedMeal.name}" deleted.`,
          type: "success",
        });
      } else if (actionType === "update") {
        const { id, newQuantity } = selectedMeal;
        const response = await axios.post(
          `https://3cfd-91-186-247-216.ngrok-free.app/api/updateMealQuantity/${id}/${newQuantity}`,
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
          message: `Meal "${updatedMeal.name}" updated to quantity ${updatedMeal.available_count}.`,
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
          message: `Order ID ${selectedOrder.id} marked as picked up.`,
          type: "success",
        });
      } else if (actionType === "cancel") {
        await axios.post(
          `https://3cfd-91-186-247-216.ngrok-free.app/api/cancel/resturant/orders/${selectedOrder.id}`,
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
          message: `Order ID ${selectedOrder.id} cancelled.`,
          type: "success",
        });
      }
    } catch (err) {
      console.error("Action error:", err);
      setAlert({ show: true, message: "An error occurred.", type: "failed" });
    } finally {
      setShowConfirmModal(false);
      setShowAlertModal(true);
      setSelectedMeal(null);
      setSelectedOrder(null);
      setActionType(null);
    }
  };

  const confirmDelete = (meal) => {
    setSelectedMeal(meal);
    setConfirmMessage(`Delete meal "${meal.name}"?`);
    setActionType("delete");
    setShowConfirmModal(true);
  };

  const confirmUpdate = (meal, newQuantity) => {
    setSelectedMeal({ ...meal, newQuantity });
    setConfirmMessage(`Update "${meal.name}" to quantity ${newQuantity}?`);
    setActionType("update");
    setShowConfirmModal(true);
  };

  const confirmPickup = (order) => {
    setSelectedOrder(order);
    setConfirmMessage(`Mark order ID ${order.id} as picked up?`);
    setActionType("pickup");
    setShowConfirmModal(true);
  };

  const confirmCancel = (order) => {
    setSelectedOrder(order);
    setConfirmMessage(`Cancel order ID ${order.id}?`);
    setActionType("cancel");
    setShowConfirmModal(true);
  };

  useEffect(() => {
    const init = async () => {
      await fetchUser();
    };
    init();
    fetchMeals();
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="orders-wrapper">
        {renderTabContent()}

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
    </>
  );
};

export default RestaurantDashboard;
