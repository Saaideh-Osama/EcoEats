import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RestaurantsList.css'; 
import salmon from '../../assets/images/salmon.jpg';
import Restlogo1  from '../../assets/images/rest-logo1.jpg';
import Restlogo2  from '../../assets/images/rest-logo2.jpg';
import Restlogo3  from '../../assets/images/rest-logo3.jpg';
import Restlogo4  from '../../assets/images/rest-logo4.jpg';

// Import the CSS file for styling
import RestaurantCard from './RestaurantCard'; // Import the RestaurantCard component
const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]); // to store the fetched restaurant data
  const [loading, setLoading] = useState(true); // to track loading state
  const [error, setError] = useState(null); // to store any error messages
  
 
  // Fetch the data when the component mounts
  useEffect(() => {
    
    const fetchRestaurants = async () => {
      try {
        // Set the request headers to accept JSON
        const response = await axios.get('https://ad67-91-186-251-160.ngrok-free.app/api/get/all-restaurants', {
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true', // Bypasses ngrok's warning page
          },
        
        });
        

        // Set the restaurants data to the state
        setRestaurants(response.data.restaurants); // Axios automatically parses the JSON response
        console.log('Response:', response); // Check the entire response object
        console.log('Data:', response.data); // Check the actual data received
        console.log('Data:', response.data.restaurants); // Check the actual data received
      } catch (err) {
         // Set dummy data in case of error
        // Set error message if any error occurs
        setError(err.message || 'Something went wrong!');
      } finally {
        setLoading(false); // Set loading to false when the fetch is complete
      }
    };

    // Call the fetch function
    fetchRestaurants();
  }, []); // Empty array means the effect runs only once when the component is mounted

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if something goes wrong
  }
  

  
  return (
    <div>
      <h1>All Restaurants</h1>
  <div id='restaurant-card-container'>
      {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            image={restaurant.license}
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