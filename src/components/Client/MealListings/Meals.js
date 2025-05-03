import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRef } from "react";
import "./Meals.css";
import { UserContext } from "../../context/UserContext"; // adjust path as needed
import { MdOutlineClose } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { MdRestaurant } from "react-icons/md";

const Meals = () => {
  // State and refs for the popup
  const popupRef = useRef(null);
  const [openpopup, setOpenPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [popupLoading, setPopupLoading] = useState(false);

  //fetch user information to recommend meals based on the user diet
  const { user, fetchUser } = useContext(UserContext);
  const [isVegetarian, setIsVegetarian] = useState(null);
  const [recommendedMeals, setRecommendedMeals] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // local loading state

  const [allMeals, setAllMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [orderquantity, setOrderquantity] = useState(1); // let's say minimum is 1
  const [restaurants, setRestaurants] = useState([]);

  // order quantity handlers
  const handleDecrement = () => {
    setOrderquantity((prev) => Math.max(prev - 1, 1)); // prevents going below 1
  };
  const handleIncrement = () => {
    setOrderquantity((prev) =>
      Math.min(prev + 1, popupContent.available_count)
    ); // prevents going above available count
  };

  // ----------------------------
  // API FETCH FUNCTIONS
  // ----------------------------

  // Fetch restaurant names and IDs
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        "https://4399-91-186-255-241.ngrok-free.app/api/get/all-restaurants-names",
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setRestaurants(response.data.restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setRestaurants([]);
    }
  };

  // Fetch all meals
  const fetchAllMeals = async () => {
    try {
      const response = await axios.get(
        "https://4399-91-186-255-241.ngrok-free.app/api/all-meals",
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setAllMeals(response.data.meals);
    } catch (error) {
      console.error("Error fetching all meals:", error);
      setAllMeals([]);
    }
  };

  // Fetch recommended meals based on diet
  const fetchRecommendedMeals = async () => {
    try {
      const endpoint = isVegetarian
        ? "https://4399-91-186-255-241.ngrok-free.app/api/vegetarian-meals"
        : "https://4399-91-186-255-241.ngrok-free.app/api/non-vegetarian-meals";

      const response = await axios.get(endpoint, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: ` Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setRecommendedMeals(response.data.meals);
    } catch (error) {
      console.error("Error fetching recommended meals:", error);
      setRecommendedMeals([]);
    }
  };

  // Fetch meal details for pop-up
  const fetchMealDetails = async (mealId) => {
    try {
      setPopupLoading(true);
      setPopupContent(null);

      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/meals/${mealId}`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer${token}`,
          },
        }
      );

      const meal = response.data.meal;
      const restaurant = restaurants.find((r) => r.id === meal.restaurant_id);
      setPopupContent({
        ...meal,
        restaurant_name: restaurant?.name || "Unknown Restaurant",
      });
    } catch (error) {
      console.error("Error fetching meal details:", error);
      setPopupContent(null);
    } finally {
      setPopupLoading(false);
    }
  };

  // Fetch meals by selected category
  const fetchMealsByCategory = async (category) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/meals/category/${category}`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllMeals(response.data.meals);
    } catch (error) {
      console.error("Error fetching meals by category:", error);
      setAllMeals([]);
    }
  };

  // Fetch everything (user first, then meals)
  const fetchEverything = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      await fetchUser();
    } finally {
      await Promise.all([fetchAllMeals(), fetchRecommendedMeals()]);
      setIsLoading(false);
    }
  };

  // ----------------------------
  // USE EFFECTS
  // ----------------------------

  // Initial fetch: restaurants and set isVegetarian if user exists
  useEffect(() => {
    fetchRestaurants();
    if (user) {
      setIsVegetarian(user.is_vegetarian);
    }
  }, [user]);

  // Fetch recommended meals when diet preference changes
  useEffect(() => {
    fetchEverything();
  }, [isVegetarian]);

  // Fetch meals based on selected category
  useEffect(() => {
    if (selectedCategory) {
      fetchMealsByCategory(selectedCategory);
    } else {
      fetchAllMeals();
    }
  }, [selectedCategory]);

  //place an order function

  const handlePlaceOrder = () => {
    placeOrder(orderquantity, popupContent.id);
  };

  const placeOrder = async (orderQuantity, popupContentId) => {
    try {
      const response = await axios.post(
        "https://4399-91-186-255-241.ngrok-free.app/api/place-order",
        {
          meal_id: popupContentId,
          quantity: orderQuantity,
        }
      );

      console.log("Order placed successfully:", response.data);
      alert(`Order placed successfully! `);
      return response.data;
    } catch (error) {
      console.error("Failed to place order:", error);
      throw error;
    }
  };

  // This effect handles closing the popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenPopup(false);
      }
    };
    if (openpopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openpopup]);

  if (isLoading) {
    return (
      <div className="loading">
        {" "}
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

  return (
    <div>
      <div className={`container ${openpopup ? "blurred" : ""}`}>
        <div className="tabs">
          <button
            className="tab "
            onClick={(e) => (window.location.href = "/")}
          >
            Your Orders
          </button>

          <button className="tab active">Meals</button>
          <button
            className="tab"
            onClick={(e) => (window.location.href = "/restaurantslist")}
          >
            Restaurant
          </button>
        </div>

        <div className="buttons">
          <button
            className={!selectedCategory ? "btn active" : "btn"}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {[
            "shawarma",
            "burger",
            "pasta",
            "salad",
            "pizza",
            "chicken-sandwich",
          ].map((category) => (
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
                  <div
                    key={meal.id}
                    className="card"
                    onClick={() => {
                      setOpenPopup(true);
                    }}
                  >
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
              <div
                className="card"
                key={meal.id}
                onClick={() => {
                  setOpenPopup(true);
                  fetchMealDetails(meal.id);
                }}
              >
                <img src={meal.image} alt={meal.name} />
                <h3>{meal.name}</h3>
                <p>JOD{meal.price}</p>
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
            <div className="grid" onClick={() => setOpenPopup(true)}>
              {allMeals.length > 0 ? (
                allMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="card"
                    onClick={() => {
                      setOpenPopup(true);
                      fetchMealDetails(meal.id);
                    }}
                  >
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

      {openpopup && (
        <div id="popup-overlay">
          <div id="popup-content" ref={popupRef}>
            {popupLoading || !popupContent ? (
              <p>Loading...</p>
            ) : (
              <>
                <div id="image-container">
                  <img src={popupContent.image} alt={popupContent.name} />
                </div>
                <h3 className="meal-title">{popupContent.name}</h3>
                <div className="restaurant-info">
                  <MdRestaurant className="restaurant-icon" />
                  <span> {popupContent.restaurant_name}</span>
                </div>
                <hr className="separator" />

                <div className="ingredients-section">
                  <span className="ingredients-label">ingredient:</span>
                  <p className="ingredients-text">{popupContent.description}</p>
                </div>
                <div className="price-quantity-section">
                  <div className="quantity-controls">
                    <span className="quantity-label">quantity:</span>
                    <button onClick={handleDecrement}>-</button>
                    <span className="quantity-value">{orderquantity}</span>
                    <button onClick={handleIncrement}>+</button>
                  </div>
                  <div className="price">
                    {(popupContent.price * orderquantity).toFixed(2)} JOD
                  </div>
                </div>
                <p
                  style={{
                    backgroundColor:
                      popupContent.contains_chicken === 0 &&
                      popupContent.contains_meat === 0
                        ? "orange"
                        : "gray",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    color: "#333",
                    fontWeight: "bold",
                    width: "fit-content",
                    top: " 220px",
                    right: "24px",
                    position: "absolute",
                  }}
                >
                  {popupContent.contains_chicken === 0 &&
                  popupContent.contains_meat === 0
                    ? "Vegetarian"
                    : "Contains Meat or Chicken"}
                </p>
                <div className="order-btn-container">
                  <button id="orderBTN">order</button>
                </div>

                <button
                  onClick={() => {
                    setOpenPopup(false);
                    setOrderquantity(1);
                  }}
                  id="close-popup"
                >
                  <MdOutlineClose />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Meals;
