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
  const isUpcoming = new Date(order.pickup_time) >= new Date();

  return (
    <div className={`order-card ${isUpcoming ? "upcoming" : "past"}`}>
      <div className="order-header">
        <h3>{order.meal.name}</h3>
        <span className="order-time">{formatDateTime(order.pickup_time)}</span>
      </div>

      <div className="order-details">
        <p>
          <strong>Restaurant:</strong> {order.restaurant.name}
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Total Price:</strong> ${order.total_price}
        </p>
      </div>

      <div className="restaurant-info">
        <h4>Restaurant Details:</h4>
        <p>
          <strong>Address:</strong> {order.restaurant.address}
        </p>
        <p>
          <strong>Phone:</strong> {order.restaurant.phone_number}
        </p>
      </div>

      <div className="order-status">
        <span className={`status-badge ${isUpcoming ? "upcoming" : "past"}`}>
          {isUpcoming ? "Upcoming" : "Completed"}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
