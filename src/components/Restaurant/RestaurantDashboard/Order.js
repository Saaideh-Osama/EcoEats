// src/components/Order.jsx
import React from "react";
import "./Order.css"; // you can keep styles separate or shared

const Order = ({ order, onCancel, onPickup }) => {
  return (
    <div className="order-card">
      <h1> order #{order.id}</h1>
      <h1> meal {order.meal_id}</h1>
      <p><strong>👤</strong> {order.user.name}</p>
      <p><strong>📞</strong> {order.user.phone_number}</p>
      <p><strong>🍽️</strong> Quantity: {order.quantity}</p>
      <p><strong>📦</strong> Status: {order.status}</p>

      <div className="button-row">
        <button
          className="order-btn cancel"
          onClick={() => onCancel(order.id)}
        >
          Cancel
        </button>
        <button
          className="order-btn pickup"
          onClick={() => onPickup(order.id)}
        >
          Picked Up
        </button>
      </div>
    </div>
  );
};

export default Order;
