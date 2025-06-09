// src/components/Order.jsx
import React from "react";
import "./Order.css"; // you can keep styles separate or shared

const Order = ({ order, onCancel, onPickup }) => {
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

  // Determine if order is upcoming or past
  const status = order.status;

  return (
    <div
      className={`client-order-card ${
        status === "reserved" ? "reserved" : "Picked-Up"
      }`}
    >
      <div className="client-order-meal-info">
        <p>
          <strong> Order details</strong>
        </p>
        <p>#{order.meal_id}</p>

        <p>
          {" "}
          <span style={{ fontWeight: "bold" }}>Total: </span>
          {order.total_price} JOD
        </p>
      </div>

      <div className="client-order-details">
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>

        <p className="client-order-time">
          <span style={{ fontWeight: "bold" }}> pickup-time:</span>
          {formatDateTime(order.pickup_time)}
        </p>
      </div>

      <div className="button-row">
        <button className="order-btn cancel" onClick={() => onCancel(order.id)}>
          Cancel
        </button>
        <button className="order-btn pickup" onClick={() => onPickup(order.id)}>
          Picked Up
        </button>
      </div>
    </div>
  );
};

export default Order;
