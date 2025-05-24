import React, { useContext, useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import "../Navbar/Navbar.css";
import AlertModal from "../Alerts/AlertModal";
import ConfirmModal from "../Alerts/ConfirmModal";
import img from "../../assets/images/test.png";
import { AiTwotoneSetting } from "react-icons/ai";
import EditClientProfile from "../Client/EditProfile/EditClientProfile";
import EditRestaurantProfile from "../Restaurant/EditRestaurantProfile/EditRestaurantProfile";
import Sidebar from "../Sidebar/Sidebar";

// Placeholder Components — replace with actual



function Navbar({ activeTab, setActiveTab }) {

  const navigate = useNavigate();
   const location = useLocation();
  const { user, fetchUser } = useContext(UserContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage ,setConfirmMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
const [showSidebar, setShowSidebar] = useState(false);



const toggleSidebar = () => {
  setShowSidebar((prev) => !prev);
};

  const handleTabClick = (tab) => {
  if (activeTab === tab) return; 
  if(user && user.role_id === 2 ){
  setActiveTab(tab);
  navigate("/clientmain", { state: { tab } });}
  else if(user && user.role_id === 3){
    setActiveTab(tab);
    navigate("/restdash", { state: { tab } });
  }
 
};
  
 useEffect(() => {
   
    if (!activeTab && user) {
      if (user.role_id === 3) {
        setActiveTab("mealListings");
      } else if (user.role_id === 2) {
        setActiveTab("meals");
      }
    }
  }, [user]);
  



 
  const handleLogout = () => {
    setShowSidebar(false);
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    setShowConfirm(false);
    setShowAlert(true);
    navigate("/",{ state :{refresh:true}});
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

 


  return (
    
      <div className="navbar">
        <a href="/" id="logo-link">
          <img src={img} className="home_logo" alt="logo" />
        </a>

        <div className="navbar-tabs">
  {user && user.role_id === 3 && (
    <>
      <a
        className={activeTab === "addMeal" ? "active" : ""}
         onClick={() => handleTabClick("addmeal")}
      >
        Add Meal
      </a>
      <a
        className={activeTab === "mealListings" ? "active" : ""}
        onClick={() => handleTabClick("mealListings")}
      >
        Meal Listings
      </a>
      <a
        className={activeTab === "reservedOrders" ? "active" : ""}
         onClick={() => handleTabClick("reservedOrders")}
      >
        Reserved Orders
      </a>
    </>
  )}

  {user && user.role_id === 2 && (
    <>
     
      <a
        className={activeTab === "meals" ? "active" : ""}
         onClick={() => handleTabClick("meals")}
      >
        Meals
      </a>
       <a
        className={activeTab === "restaurants" ? "active" : ""}
         onClick={() => handleTabClick("restaurants")}
      >
        Restaurants
      </a>
      <a
        className={activeTab === "orders" ? "active" : ""}
         onClick={() => handleTabClick("orders")}
      >
        Orders
      </a>
    </>
  )}
</div>
  <div className="settings" onClick={toggleSidebar}>
  <AiTwotoneSetting />
</div>
{showSidebar && (
  <Sidebar onClose={() => setShowSidebar(false)}>
    {user?.role_id === 2 ? <EditClientProfile /> : <EditRestaurantProfile />}

    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  </Sidebar>
)}

        {showConfirm && (
          <ConfirmModal
            message="Are you sure you want to logout?"
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
          />
        )}
        {showAlert && (
          <AlertModal
            type="success"
            message="You have been logged out successfully."
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>

      
   
  );
}

export default Navbar;
