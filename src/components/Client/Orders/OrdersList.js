import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // This runs once when the component mounts
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://4399-91-186-255-241.ngrok-free.app/api/client-orders-history",
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("successfully");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching Orders:", error);
      setOrders([]);
    }
  };
  // Separate current and past orders based on pickup time
  const currentOrders = orders.filter(
    (order) => new Date(order.pickup_time) >= new Date()
  );

  const pastOrders = orders.filter(
    (order) => new Date(order.pickup_time) < new Date()
  );

  return (
    <>
      <div className="tabs">
        <button className="tab active">Your Orders</button>
        <button
          className="tab"
          onClick={(e) => (window.location.href = "/Meals")}
        >
          Meals
        </button>
        <button
          className="tab"
          onClick={(e) => (window.location.href = "/Restaurant")}
        >
          Restaurant
        </button>
      </div>

      <div className="orders-container">
        <section className="current-orders">
          <h2>Upcoming Orders</h2>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <OrderCard
                key={`current-${order.meal_id}-${order.pickup_time}`}
                order={order}
              />
            ))
          ) : (
            <p>No upcoming orders found.</p>
          )}
        </section>

        <section className="past-orders">
          <h2>Past Orders</h2>
          {pastOrders.length > 0 ? (
            pastOrders.map((order) => (
              <OrderCard
                key={`past-${order.meal_id}-${order.pickup_time}`}
                order={order}
              />
            ))
          ) : (
            <p>No past orders found.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default OrdersList;
