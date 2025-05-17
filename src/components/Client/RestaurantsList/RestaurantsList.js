import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RestaurantsList.css";
import { RotatingLines } from "react-loader-spinner";
import RestaurantCard from "./RestaurantCard"; // Import the RestaurantCard component

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "https://4399-91-186-255-241.ngrok-free.app/api/get/restaurants",
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        // ✅ Just use the data directly — assuming backend returns valid image URLs
        setRestaurants(response.data.restaurants);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

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
    <>
      <div className="meals_tabs">
        <button
          className="meals_tab"
          onClick={(e) => (window.location.href = "/orderslist")}
        >
          Your Orders
        </button>
        <button className="meals_tab meals_active">Meals</button>
        <button
          className="meals_tab"
          onClick={(e) => (window.location.href = "/restaurantslist")}
        >
          Restaurant
        </button>
      </div>
      <h1 className="all-res">All Restaurants</h1>
      <div id="restaurant-card-container">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            image={restaurant.image} // ✅ Use direct image URL
            phone_number={restaurant.phone_number}
            Working_hours_from={restaurant.working_hours_from}
            Working_hours_to={restaurant.working_hours_to}
            restaurant_info={restaurant.restaurant_info}
          />
        ))}
      </div>
    </>
  );
};

export default AllRestaurants;
