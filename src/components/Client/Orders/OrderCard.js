import React from "react";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  // Format date and time for display
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
  const cleanStatus = status.trim().toLowerCase();

  return (
    <div
      className={`client-order-card ${
        cleanStatus === "reserved" ? "reserved" : "picked-up"
      }`}
    >
      <div className="order-section">
        <p>
          <strong>order details:</strong>{" "}
          <span className="highlight">#{order.meal.name}</span>
        </p>
        <p className="dim-text">
          Quantity: <span className="black-text">{order.quantity}</span>
        </p>
        <p className="dim-text">
          pickup-time:{" "}
          <span className="black-text">
            {formatDateTime(order.pickup_time)}
          </span>
        </p>
      </div>

      <div className="restaurant-section">
        <p>
          <strong>Restaurant Details:</strong>
        </p>
        <p>
          <span className="dim-text">Name:</span> {order.restaurant.name}
        </p>
        <p>
          <span className="dim-text">Address:</span> {order.restaurant.address}
        </p>
        <p>
          <span className="dim-text">Phone:</span>{" "}
          {order.restaurant.phone_number}
        </p>
      </div>

      <div className="summary-section">
        <p>
          <strong>Total:</strong> {order.total_price} JOD
        </p>
        <button
          className={`status ${
            cleanStatus === "reserved"
              ? "status-reserved"
              : "status-not-reserved"
          }`}
        >
          {status}
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
