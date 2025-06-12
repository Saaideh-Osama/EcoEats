import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RestaurantsList.css";
import { RotatingLines } from "react-loader-spinner";
import RestaurantCard from "./RestaurantCard";

const AllRestaurants = ({ active }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false); // Start with false
  const [error, setError] = useState(null);
  const [loadedOnce, setLoadedOnce] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://d201-91-186-254-78.ngrok-free.app/api/get/restaurants",
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setRestaurants(response.data.restaurants);
        setLoadedOnce(true);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (active && !loadedOnce) {
      fetchRestaurants();
    }
  }, [active, loadedOnce]);

  if (loading) {
    return (
      <div className="loading">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="restList-page">
      <h1>All Restaurants</h1>
      <div id="restaurant-card-container">
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              address={restaurant.address}
              image={restaurant.image}
              phone_number={restaurant.phone_number}
              Working_hours_from={restaurant.working_hours_from}
              Working_hours_to={restaurant.working_hours_to}
              restaurant_info={restaurant.restaurant_info}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllRestaurants;
