import { useEffect, useState,useContext } from "react";
import axios from "axios";
import "./Meals.css";
import { UserContext } from '../context/UserContext'; // adjust path as needed
const Meals = () => {
  const { user, fetchUser } = useContext(UserContext);

  const [isVegetarian, setIsVegetarian] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // local loading state

  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    console.log("User context:", user); // Debugging line
    if (user) {
      setIsVegetarian(user.is_vegetarian);
    }
  }, [user]);

  const fetchAllMeals = async () => {
    try {
      const response = await axios.get("https://ad67-91-186-251-160.ngrok-free.app/api/all-meals", {
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });
      setAllMeals(response.data.meals);
    } catch (error) {
      console.error("Error fetching all meals:", error);
      setAllMeals([]);
    }
  };

  const fetchRecommendedMeals = async () => {
    try {
      const endpoint = isVegetarian
        ? "https://ad67-91-186-251-160.ngrok-free.app/api/vegetarian-meals"
        : "https://ad67-91-186-251-160.ngrok-free.app/api/non-vegetarian-meals";
      
      const response = await axios.get(endpoint, {
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setRecommendedMeals(response.data.meals);
    } catch (error) {
      console.error("Error fetching recommended meals:", error);
      setRecommendedMeals([]);
    }
  };

  const fetchEverything = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      await fetchUser(); // Wait until user is loaded
    } finally {
      // Once user is fetched, now fetch meals (depending on isVegetarian)
      await Promise.all([
        fetchAllMeals(),
        fetchRecommendedMeals(),
      ]);
      setIsLoading(false); // All 3 calls are done
    }
  };
  useEffect(() => {
    fetchEverything();
  }, [isVegetarian]); // re-trigger when isVegetarian changes

  useEffect(() => {
    if (selectedCategory) {
      fetchMealsByCategory(selectedCategory);
    } else {
      fetchAllMeals();
    }

  }, [selectedCategory]);
  const fetchMealsByCategory = async (category) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `https://ad67-91-186-251-160.ngrok-free.app/api/meals/category/${category}`,
        {
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAllMeals(response.data.meals);
    } catch (error) {
      console.error("Error fetching meals by category:", error);
      setAllMeals([]);
    }
  };
  

  


  if (isLoading) {
    return <div className="loading">Loading meals...</div>;
  }
  
  return (
    <div className="container">
      <div className="tabs">
        <button className="tab active">Meals</button>
        <button className="tab">Restaurant</button>
      </div>

      <div className="buttons">
        <button
          className={!selectedCategory ? "btn active" : "btn"}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {["shawarma", "burger", "pasta", "salad", "pizza", "chicken-sandwich"].map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "btn active" : "btn"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory && (
  <>
    <h2 className="section-title">
      All <span id="category_name">{selectedCategory}</span> meals
    </h2>
    <div className="grid">
      {allMeals.length > 0 ? (
        allMeals.map((meal) => (
          <div key={meal.id} className="card">
            <img src={meal.image} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p>${meal.price}</p>
          </div>
        ))
      ) : (
        <p>No meals found</p>
      )}
    </div>
  </>
)}

<h2 className="section-title">Recommended for you</h2>
<div className="grid">
  {recommendedMeals.length > 0 ? (
    recommendedMeals.map((meal) => (
      <div key={meal.id} className="card">
        <img src={meal.image} alt={meal.name} />
        <h3>{meal.name}</h3>
        <p>${meal.price}</p>
      </div>
    ))
  ) : (
    <p>No recommended meals found</p>
  )}
</div>

{!selectedCategory && (
  <>
    <h2 className="section-title">
      All <span id="category_name">meals</span>
    </h2>
    <div className="grid">
      {allMeals.length > 0 ? (
        allMeals.map((meal) => (
          <div key={meal.id} className="card">
            <img src={meal.image} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p>${meal.price}</p>
          </div>
        ))
      ) : (
        <p>No meals found</p>
      )}
    </div>
  </>
)}

    </div>
  );
};

export default Meals;