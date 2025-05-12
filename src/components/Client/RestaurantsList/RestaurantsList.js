import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RestaurantsList.css";
import { RotatingLines } from "react-loader-spinner";

// Import the CSS file for styling
import RestaurantCard from "./RestaurantCard"; // Import the RestaurantCard component
const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]); // to store the fetched restaurant data
  const [loading, setLoading] = useState(true); // to track loading state
  const [error, setError] = useState(null); // to store any error messages

  // Fetch restaurant names data when the component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Set the request headers to accept JSON
        const response = await axios.get(
          "https://4399-91-186-255-241.ngrok-free.app/api/get/restaurants",
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true", // Bypasses ngrok's warning page
            },
          }
        );
        // Set the restaurants data to the state
        setRestaurants(response.data.restaurants); // Axios automatically parses the JSON response
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false); // Set loading to false when the fetch is complete
      }
    };
    // Call the fetch function
    fetchRestaurants();
  }, []); // Empty array means the effect runs only once when the component is mounted

  if (loading) {
    return (
      <div className="loading">
        {" "}
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    ); // Display loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if something goes wrong
  }

  return (
    <div>
      <div className="tabs">
        <button
          className="tab "
          onClick={(e) => (window.location.href = "/orderslist")}
        >
          Your Orders
        </button>
        <button
          className="tab "
          onClick={(e) => (window.location.href = "/meals")}
        >
          Meals
        </button>
        <button className="tab active">Restaurant</button>
      </div>
      <h1>All Restaurants</h1>
      <div id="restaurant-card-container">
        {restaurants.map((restaurant) => (
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
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
