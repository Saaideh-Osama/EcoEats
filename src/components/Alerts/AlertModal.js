// AlertModal.js
import React from 'react';
import './AlertModal.css'; // New CSS file for custom alert styling

const AlertModal = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p>{message}</p>
        <div className="alert-buttons">
          <button className="alert-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
