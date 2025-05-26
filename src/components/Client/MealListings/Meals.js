import { useEffect, useState, useContext } from "react";
import axios from "axios";

import "./Meals.css";
import { UserContext } from "../../context/UserContext";
import { MdOutlineClose } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import AlertModal from "../../Alerts/AlertModal";
import ConfirmModal from "../../Alerts/ConfirmModal";
import MealCard from "./MealCard";
import MealPopUp from "./MealPopUp";

import pizza from "../../../assets/images/pizza.png";
import beef from "../../../assets/images/beef.png";
import chk from "../../../assets/images/chk.png";
import pasta from "../../../assets/images/pasta.png";
import shaw from "../../../assets/images/shaw.png";
import salad from "../../../assets/images/salad.png";
import offer from "../../../assets/images/add.jpg";
// ... imports unchanged
const Meals = () => {
  const [openpopup, setOpenPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [popupLoading, setPopupLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [orderquantity, setOrderquantity] = useState(1);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { user, fetchUser } = useContext(UserContext);
  const [isVegetarian, setIsVegetarian] = useState(null);

  const categories = [
    {
      id: null,
      name: "All",
      icon: "https://cdn-icons-png.flaticon.com/512/833/833314.png",
    },
    { id: "shawarma", name: "shawarma", icon: shaw },
    { id: "burger", name: "burger", icon: beef },
    { id: "Chicken Sandwich", name: "Chicken Sandwich", icon: chk },
    { id: "salad", name: "salad", icon: salad },
    { id: "pasta", name: "pasta", icon: pasta },
    { id: "pizza", name: "pizza", icon: pizza },
  ];

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000); // 2 seconds

      return () => clearTimeout(timer); // cleanup
    }
  }, [showAlert]);

  const handleDecrement = () =>
    setOrderquantity((prev) => Math.max(prev - 1, 1));
  const handleIncrement = () =>
    setOrderquantity((prev) =>
      Math.min(prev + 1, popupContent?.available_count || 1)
    );

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(
        "https://4399-91-186-255-241.ngrok-free.app/api/get/all-restaurants-names",
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setRestaurants(res.data.restaurants);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };

  const fetchAllMeals = async () => {
    try {
      const res = await axios.get(
        "https://4399-91-186-255-241.ngrok-free.app/api/all-meals",
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setAllMeals(res.data.meals);
    } catch (err) {
      console.error("Error fetching all meals:", err);
    }
  };

  const fetchRecommendedMeals = async () => {
    if (isVegetarian === null) return;
    try {
      const endpoint = isVegetarian
        ? "https://4399-91-186-255-241.ngrok-free.app/api/vegetarian-meals"
        : "https://4399-91-186-255-241.ngrok-free.app/api/non-vegetarian-meals";
      const res = await axios.get(endpoint, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setRecommendedMeals(res.data.meals);
    } catch (err) {
      console.error("Error fetching recommended meals:", err);
    }
  };

  const fetchMealDetails = async (mealId) => {
    try {
      setPopupLoading(true);
      const res = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/meals/${mealId}`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const meal = res.data.meal;
      const restaurant = restaurants.find((r) => r.id === meal.restaurant_id);

      setPopupContent({
        ...meal,
        restaurant_name: restaurant?.name || "Unknown",
      });
      setOpenPopup(true);
    } catch (err) {
      console.error("Error fetching meal details:", err);
    } finally {
      setPopupLoading(false);
    }
  };

  const fetchMealsByCategory = async (category) => {
    try {
      const res = await axios.get(
        `https://4399-91-186-255-241.ngrok-free.app/api/meals/category/${category}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setAllMeals(res.data.meals);
    } catch (err) {
      console.error("Error fetching meals by category:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      await fetchRestaurants();
    };
    init();
  }, []);

  useEffect(() => {
    if (user) setIsVegetarian(user.is_vegetarian);
  }, [user]);

  useEffect(() => {
    const loadMeals = async () => {
      setIsLoading(true);
      if (selectedCategory) {
        await fetchMealsByCategory(selectedCategory);
      } else {
        await fetchAllMeals();
      }
      await fetchRecommendedMeals();
      setIsLoading(false);
    };
    if (isVegetarian !== null) loadMeals();
  }, [selectedCategory, isVegetarian]);

  const handlePlaceOrder = () => {
    setConfirmationMessage(
      `Are you sure you want to order ${orderquantity} x ${popupContent?.name}?`
    );
    setShowConfirm(true);
  };

  const placeOrder = async () => {
    try {
      const res = await axios.post(
        "https://4399-91-186-255-241.ngrok-free.app/api/place-order",
        { meal_id: popupContent.id, quantity: orderquantity },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setShowConfirm(false);
      setAlertMessage(`Order placed: ${orderquantity} x ${popupContent.name}`);
      setAlertType("success");
      setShowAlert(true);
      setOpenPopup(false); // Optional: auto-close popup
      setOrderquantity(1);
    } catch (err) {
      setShowConfirm(false);
      setAlertMessage(
        err.response?.status === 401
          ? "You need to be logged in first to reserve a meal."
          : "Failed to place order."
      );
      setAlertType("error");
      setShowAlert(true);
    }
  };

  if (isLoading) {
    return (
      <div className="meals_loading">
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
        <div className="meals_categories_container">
          <div className="meals_category_grid">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`meals_category_button ${
                  selectedCategory === cat.id ? "cat_active" : ""
                }`}
              >
                <img src={cat.icon} alt={cat.name} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="meals_promo_container">
          <div className="meals_promo_img">
            <img src={offer} alt="Offer" />
          </div>
        </div>

        <h2 className="meals_section_title">Picks for you</h2>
        <div className="meals_horizontal_scroll">
          <div className="meals_scroll_container">
            {recommendedMeals.map((meal) => (
              <MealCard
                key={`rec-${meal.id}`}
                meal={meal}
                onClick={() => fetchMealDetails(meal.id)}
              />
            ))}
          </div>
        </div>

        <h2 className="meals_section_title">
          All <span>{selectedCategory || "meals"}</span>
        </h2>
        <div className="meals_grid">
          {allMeals.map((meal) => (
            <MealCard
              key={`all-${meal.id}`}
              meal={meal}
              onClick={() => fetchMealDetails(meal.id)}
            />
          ))}
        </div>
      </div>

      {openpopup && (
        <MealPopUp
          open={openpopup}
          meal={popupContent}
          onClose={() => {
            setOpenPopup(false);
            setOrderquantity(1);
          }}
          orderQuantity={orderquantity}
          setOrderquantity={setOrderquantity}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handlePlaceOrder={handlePlaceOrder}
          loading={popupLoading}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          show={showConfirm}
          message={confirmationMessage}
          onConfirm={placeOrder}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showAlert && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default Meals;
