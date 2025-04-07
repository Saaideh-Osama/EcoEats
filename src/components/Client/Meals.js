import { useEffect, useState } from "react";
import axios from "axios";
import "./Meals.css";

export default function Meals() {
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("pizza");
  

  const fetchMealsByCategory = async (category) => {
    try {
     
      const response = await axios.get(`https://87e9-92-241-35-12.ngrok-free.app/api/meals/category/${category}`);
      setAllMeals(response.data.meals); 
    } catch (error) {
      console.error("Error fetching meals by category:", error);
      setAllMeals([]);
    } 
  };

  const fetchAllMeals = async () => {
    try {
     
      const response = await axios.get("https://87e9-92-241-35-12.ngrok-free.app/api/all-meals");
      setAllMeals(response.data.meals); 
    } catch (error) {
      console.error("Error fetching all meals:", error);
      setAllMeals([]);
    } 
  };

  const fetchRecommendedMeals = async () => {
    try {
     
      const response = await axios.get("https://87e9-92-241-35-12.ngrok-free.app/api/vegetarian-meals");
      setRecommendedMeals(response.data.meals ); 
    } catch (error) {
      console.error("Error fetching recommended meals:", error);
      setRecommendedMeals([]);
    } 
  };

  useEffect(() => {
    fetchMealsByCategory(selectedCategory);
    fetchRecommendedMeals();
    fetchAllMeals();
  }, [selectedCategory]);

  return (
    <div className="container">
      <div className="tabs">
        <button className="tab active">Meals</button>
        <button className="tab">Restaurant</button>
      </div>

      <div className="buttons">
        {["pizza", "pasta", "beef", "chicken"].map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "btn active" : "btn"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <h2 className="section-title">Recommended for you</h2>
      { (
        <div className="grid">
          {recommendedMeals?.map((meal) => (
            <div key={meal.id} className="card">
              <img src={meal.image} alt={meal.name} />
              <h3>{meal.name}</h3>
              <p>${meal.price}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="section-title">All meals</h2>
      { (
        <div className="grid">
          {allMeals?.map((meal) => (
            <div key={meal.id} className="card">
              <img src={meal.image} alt={meal.name} />
              <h3>{meal.name}</h3>
              <p>${meal.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}