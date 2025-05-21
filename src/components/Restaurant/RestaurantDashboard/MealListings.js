import Meal from "./Meal";

const MealListings = ({ meals, loading, onDelete, onUpdateQuantity }) => {
  if (loading) return <p>Loading meals...</p>;

  const soldOut = meals.filter((m) => m.available_count === 0);
  const available = meals.filter((m) => m.available_count > 0);

  return (
    <div id="all-meals-container">
      <div id="available-meals-header">
        <h2>Sold out Meals</h2>
      </div>
      <div id="sold-out-meals">
        {soldOut.map((meal) => (
          <Meal
            key={meal.id}
            meal={meal}
            onQuantityUpdate={(id, qty) => onUpdateQuantity(meal, qty)}
          />
        ))}
      </div>

      <div id="available-meals-header">
        <h2>Available Meals</h2>
      </div>
      <div id="available-meals">
        {available.map((meal) => (
          <Meal key={meal.id} meal={meal} onDelete={() => onDelete(meal)} />
        ))}
      </div>
    </div>
  );
};

export default MealListings;
