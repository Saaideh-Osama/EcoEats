import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RotatingLines } from "react-loader-spinner";

const SinglePageRestaurant = () => {
  const { id } = useParams(); // restaurant ID from route
  const [restaurant, setRestaurant] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch restaurant details
  const fetchRestaurantDetails = async () => {
    try {
      const response = await axios.get(`https://4399-91-186-255-241.ngrok-free.app/api/restaurant/info/${id}`, {
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });
      setRestaurant(response.data.restaurant_info);
    
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  // Fetch restaurant meals
  const fetchRestaurantMeals = async () => {
    try {
      const response = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/restaurant-meals/${id}`,
        {
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          }
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
    return <div className="loading"><RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} /></div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <img src={restaurant.image} alt="License" width="300px" />
      <p><strong>Address:</strong> {restaurant.address}</p>
      <p><strong>Phone:</strong> {restaurant.phone_number}</p>
      <p><strong>Working Hours:</strong> {restaurant.working_hours_from} - {restaurant.working_hours_to}</p>
      <p><strong>About:</strong> {restaurant.restaurant_info}</p>

      <h2>Meals from {restaurant.name}</h2>
      <ul>
        {meals.map(meal => (
          <li key={meal.id}>
            <h4>{meal.name}</h4>
            <p>{meal.description}</p>
            <p>Price: ${meal.price}</p>
            <p>Quantity Available: {meal.available_quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SinglePageRestaurant;
