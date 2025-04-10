import React from 'react'
import './RestaurantsList.css' // Import the CSS file for styling
import { GoClock } from "react-icons/go";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function RestaurantCard({ name, address, image,working_hours_from,working_hours_to,phone_number,restaurant_info }) {
    return (
      <div class="restaurant-card">
      <div class="restaurant-card-inner">
        <div class="restaurant-card-front"><img src={image}/></div>
        <div class="restaurant-card-back">
          <h2>{name}</h2>
          
          <p><strong><FaLocationDot /></strong> {address}</p>
          <p><strong><FaPhoneSquareAlt /></strong> {phone_number}</p>
                 <div class="back-button">
            <button class="btn">More info</button>
          </div>
        </div>
      </div>
    </div>
      );
  
}

export default RestaurantCard