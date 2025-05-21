import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Meals from "./MealListings/Meals";
import OrdersList from "./Orders/OrdersList";
import RestaurantList from "./RestaurantsList/RestaurantsList";
import AlertModal from "../Alerts/AlertModal";
import ConfirmModal from "../Alerts/ConfirmModal";
import "./ClientDashboard.css";
import Navbar from "../Navbar/Navbar";

const UserDashboard = () => {
 const location = useLocation();

    const [activeTab, setActiveTab] = useState(location.state?.tab || "meals");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});

  const navigate = useNavigate();
  const showAlertModal = (msg, type) => {
    setAlertMessage(msg);
    setAlertType(type);
    setShowAlert(true);
  };

  const showConfirmationModal = (message, confirmAction, cancelAction = () => {}) => {
    setConfirmMessage(message);
    setOnConfirm(() => confirmAction);
    setOnCancel(() => cancelAction);
    setShowConfirm(true);
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="client-content">
        <div style={{ display: activeTab === "meals" ? "block" : "none" }}>
          <Meals active={activeTab === "meals"} />
        </div>
        <div style={{ display: activeTab === "restaurants" ? "block" : "none" }}>
          <RestaurantList active={activeTab === "restaurants"} />
        </div>
        <div style={{ display: activeTab === "orders" ? "block" : "none" }}>
          <OrdersList active={activeTab === "orders"} />
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          message={confirmMessage}
          onConfirm={() => {
            onConfirm();
            setShowConfirm(false);
          }}
          onCancel={() => {
            onCancel();
            setShowConfirm(false);
          }}
        />
      )}

      {showAlert && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default UserDashboard;
