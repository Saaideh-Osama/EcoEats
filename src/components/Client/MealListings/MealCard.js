import "./MealCard.css";
const MealCard = ({ meal, onClick }) => (
  <div className="meals_card" onClick={() => onClick(meal.id)} key={meal.id}>
    
    <img src={meal.image} alt={meal.name} />
    <h3>{meal.name}</h3>
    <h3>Qty: {meal.available_count}</h3>
    <h3>original price:<del style={{color:'red'}}>{meal.original_price}</del> </h3>
    <p>Listed Price : JOD{meal.price}</p>
  </div>
);

export default MealCard;
