import React from "react";
import "./CustomAlert.css";
import { useNavigate } from "react-router-dom";

const CustomAlert = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    onClose();
    navigate("/signup", { state: { isLogin: "true" } });
  };

  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <p>{message}</p>
        <button onClick={handleLoginRedirect} className="alert-login-btn">
          Login
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
