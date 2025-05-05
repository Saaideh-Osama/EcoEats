import React, { useState } from "react";
import "./SoldOutMeal.css";

const SoldOutMeal = ({ meal, onQuantityUpdate }) => {
  const [newQuantity, setNewQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuantity || isNaN(newQuantity) || newQuantity <= 0) return;
    onQuantityUpdate(meal.id, parseInt(newQuantity));
  };

  return (
    <div className="zero-meal-card">
      <img src={meal.image} alt={meal.name} className="meal-image" />
      <div className="meal-details">
        <h4>{meal.name}</h4>
        <p>Current Qty: {meal.available_count}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            placeholder="New Quantity"
            min="1"
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SoldOutMeal;
