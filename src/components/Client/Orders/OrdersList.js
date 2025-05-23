import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

const OrdersList = ({ active }) => {
  const [orders, setOrders] = useState([]);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
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
      setOrders(response.data.orders);
      setLoadedOnce(true);
    } catch (error) {
      console.error("Error fetching Orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (active && !loadedOnce) {
      fetchOrders();
    }
  }, [active, loadedOnce]);

  const currentOrders = orders.filter((order) => order.status === "Reserved");
  const pastOrders = orders.filter((order) => order.status === "Picked Up");

  return (
    <div className="client-orders-container">
      <h2>Upcoming Orders</h2>
      <section className="client-current-orders">
        {loading ? (
          <p>Loading...</p>
        ) : currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <OrderCard
              key={`current-${order.meal_id}-${order.pickup_time}`}
              order={order}
              status="waiting pickup"
            />
          ))
        ) : (
          <p>No upcoming orders found.</p>
        )}
      </section>

      <h2>Past Orders</h2>
      <section className="client-past-orders">
        {loading ? (
          <p>Loading...</p>
        ) : pastOrders.length > 0 ? (
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
  );
};

export default OrdersList;
