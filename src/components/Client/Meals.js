import { useState } from "react";
import "./Meals.css";

export default function Meals() {
  const [selectedMeal, setSelectedMeal] = useState("pizza");

  return (
    <div className="container">
    

  
      <div className="tabs">
        <button className="tab active">Meals</button>
        <button className="tab">Restaurant</button>
      </div>
      
      <div className="buttons">
        <button 
          className={selectedMeal === "pizza" ? "btn active" : "btn"} 
          onClick={() => setSelectedMeal("pizza")}
        >
          Pizza
        </button>
        <button 
          className={selectedMeal === "pasta" ? "btn active" : "btn"} 
          onClick={() => setSelectedMeal("pasta")}
        >
          Pasta
        </button>
        <button 
          className={selectedMeal === "beef" ? "btn active" : "btn"} 
          onClick={() => setSelectedMeal("beef")}
        >
         beef
        </button>
        <button 
          className={selectedMeal === "chicken" ? "btn active" : "btn"} 
          onClick={() => setSelectedMeal("chicken")}
        >
          chicken
        </button>
      </div>

     
      <h2 className="section-title">Recommended for you</h2>
      <div className="grid">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card">
            <img src="" alt="here"></img>
            </div>
        ))}
      </div>
      <h2 className="section-title">All meals</h2>
      <div className="grid">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card">
            <img src="" alt="here"></img>
            </div>
        ))}
      </div>
    </div>
    
  );
}