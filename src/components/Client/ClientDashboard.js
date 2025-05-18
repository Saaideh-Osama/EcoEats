import React, { useState } from "react";
import Meals from "./MealListings/Meals";
import OrdersList from "./Orders/OrdersList";
import AllRestaurants from "./RestaurantsList/RestaurantsList";
import AlertModal from "../Alerts/AlertModal";
import ConfirmModal from "../Alerts/ConfirmModal";
import "./ClientDashboard.css"; // Import your CSS file for styling
// optional styling

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("meals");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [showAlert, setShowAlert] = useState(false);

  const [confirmMessage, setConfirmMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});

  // Reusable modal triggers for child components
  const showmyAlert = (msg, type) => {
    setAlertMessage(msg);
    setAlertType(type);
    setShowAlert(true);
  };

  const showConfirmation = (message, confirmAction, cancelAction = () => {}) => {
    setConfirmMessage(message);
    setOnConfirm(() => confirmAction);
    setOnCancel(() => cancelAction);
    setShowConfirm(true);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "meals":
        return <Meals showAlert={showmyAlert} showConfirmation={showConfirmation} />;
      case "orders":
        return <OrdersList />;
      case "restaurants":
        return <AllRestaurants />;
      default:
        return null;
    }
  };

  return (
   <div>
<div className="client-tab-wrap">
    <input type="radio" name="tabs" id="tab1"/>
    <div class="tab-label-content" id="tab1-content">
      <label for="tab1" className="client-label" onClick={() => setActiveTab("meals")}>Meals</label>
      
    </div>
   
     <input type="radio" name="tabs" id="tab3"/>
     <div class="tab-label-content" id="tab3-content">
      <label for="tab3"  className="client-label" onClick={() => setActiveTab("restaurants")}>Restaurants</label>
      
    </div> 
    <input type="radio" name="tabs" id="tab2"/>
    <div class="tab-label-content" id="tab2-content">
      <label for="tab2"  className="client-label"  onClick={() => setActiveTab("orders")}>Orders</label>
      
    </div>
  
    <div class="slide"></div>
    </div>

<div className="client-tab-content">
 {renderTab()}</div>


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
    </div>
  );
};

export default UserDashboard;