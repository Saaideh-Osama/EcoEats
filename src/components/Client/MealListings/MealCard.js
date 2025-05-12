import "./MealCard.css";
const MealCard = ({ meal, onClick }) => (
  <div className="meals_card" onClick={() => onClick(meal.id)} key={meal.id}>
    <div> {meal.id}</div>
    <img src={meal.image} alt={meal.name} />
    <h3>{meal.name}</h3>
    <h3>{meal.available_count}</h3>
    <p>JOD{meal.price}</p>
  </div>
);

export default MealCard;
