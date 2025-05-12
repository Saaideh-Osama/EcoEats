import React, { useState } from "react";
import "./Meal.css";

const Meal = ({ meal, onQuantityUpdate, onDelete}) => {
  const [newQuantity, setNewQuantity] = useState("");
 const [showRefillForm, setShowRefillForm] = useState(false);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuantity || isNaN(newQuantity) || newQuantity <= 0) return;
    onQuantityUpdate(meal.id, parseInt(newQuantity));
  };

  return (
    <div className={`meal-card ${meal.available_count === 0 ? "blur" : ""}`}>
      
      <img src={meal.image} alt={meal.name} className="meal-image" />
      <div className="meal-details">
        <h4>{meal.name}</h4>
        <p>Current Qty: {meal.available_count}</p>

        {meal.available_count === 0 ? (
          <>
            {!showRefillForm ? (
             <div className="button-collection">  <button className="refill-button" onClick={() => setShowRefillForm(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#38a84f"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>
              </button>
              <span id="button-name"> Refill</span>
               </div >
            ) : (
              <form onSubmit={handleSubmit} className="refill-form">
                <input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  placeholder="New Quantity"
                  min="1"
                  className="refill-input"
                />
                <div className="button-collection"> <button type="submit" className="submit-refill"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#38a84f"><path d="m482-200 114-113-114-113-42 42 43 43q-28 1-54.5-9T381-381q-20-20-30.5-46T340-479q0-17 4.5-34t12.5-33l-44-44q-17 25-25 53t-8 57q0 38 15 75t44 66q29 29 65 43.5t74 15.5l-38 38 42 42Zm165-170q17-25 25-53t8-57q0-38-14.5-75.5T622-622q-29-29-65.5-43T482-679l38-39-42-42-114 113 114 113 42-42-44-44q27 0 55 10.5t48 30.5q20 20 30.5 46t10.5 52q0 17-4.5 34T603-414l44 44ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></button>
            <span id="button-name">Update </span>  </div>
              </form>
            )}
          </>
        ) : (
         <div className="button-collection">  <button className="delete-button" onClick={() => onDelete(meal.id)}>
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
          </button>
        <span id="button-name"> Delete</span>
        </div>
        )}
      </div>
      
    </div>
  );
  
};

export default Meal;
