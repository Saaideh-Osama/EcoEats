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

  return (
    <div className={`client-order-card ${status ==="reserved"? "reserved" : "Picked-Up"}`}>
      <div className="client-order-meal-info">
        <p><strong> Order details</strong></p>
        <p>{order.meal.name}</p>
      <button className={`status ${status === 'reserved' ? 'status-reserved' : 'status-not-reserved'}`}>
   {status}
</button>
      <p>
          Total:  {order.total_price} JOD
        </p>
      </div>

      <div className="client-order-details">
        
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        
        <p className="client-order-time">pickup-time:{formatDateTime(order.pickup_time)}</p>

      </div>

      <div className="client-order-restaurant-info">
        <h4>Restaurant Details:</h4>
        <p>
          <strong>Name:</strong> {order.restaurant.name}
        </p>
        <p>
          <strong>Address:</strong> {order.restaurant.address}
        </p>
        <p>
          <strong>Phone:</strong> {order.restaurant.phone_number}
        </p>
      </div>

      
    </div>
  );
};

export default OrderCard;
