import React from "react";
import "./RestaurantCard.css";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function RestaurantCard({ id, name, address, image }) {
  return (
    <div
      className="restaurant-card"
      onClick={() => (window.location.href = `/restaurant/${id}`)}
    >
      <div className="restaurant-card-image-container">
        <img src={image} alt={name} className="restaurant-image" />
      </div>

      <div className="restaurant-card-content">
        <h2 className="restaurant-name">{name}</h2>
        <p className="restaurant-address">
          <FaLocationDot className="location-icon" /> {address}
        </p>
        <button className="view-button ">view details</button>
      </div>
    </div>
  );
}

export default RestaurantCard;
