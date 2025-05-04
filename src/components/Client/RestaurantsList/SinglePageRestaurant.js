import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import "./SinglePageRestaurant.css";

import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import img from "../../../assets/images/rest-logo3.jpg";

const SinglePageRestaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/restaurant/info/${id}`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setRestaurant(response.data.restaurant_info);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  const fetchRestaurantMeals = async () => {
    try {
      const response = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/restaurant-meals/${id}`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setMeals(response.data.meals);
    } catch (error) {
      console.error("Error fetching restaurant meals:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRestaurantDetails();
      await fetchRestaurantMeals();
      setLoading(false);
    };

    fetchData();
  }, [id]);

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

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div className="restaurant-page">
      <div className="restaurant-banner">
        <img src={img} alt="Restaurant" />
        <div className="restaurant-info-box">
          <h1>{restaurant.name}</h1>
          <p className="about">{restaurant.restaurant_info}</p>
          <p>
            <FaLocationDot /> {restaurant.address}
          </p>
          <p>
            <FaPhoneAlt /> {restaurant.phone_number}
          </p>
          <p>
            <GoClock /> {restaurant.working_hours_from} -{" "}
            {restaurant.working_hours_to}
          </p>
        </div>
      </div>

      <div className="meals-section">
        <h2>Meals from {restaurant.name}</h2>
        <div className="meals-grid">
          {meals.map((meal) => (
            <div className="meal-card" key={meal.id}>
              <h4>{meal.name}</h4>
              <p>{meal.description}</p>
              <p>
                <strong>Price:</strong> ${meal.price}
              </p>
              <p>
                <strong>Quantity:</strong> {meal.available_quantity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePageRestaurant;
