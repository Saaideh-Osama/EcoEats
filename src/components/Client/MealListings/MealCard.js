const MealCard = ({ meal, onClick }) => (
    <div className="card" onClick={() => onClick(meal.id)} key={meal.id}>
      <img src={meal.image} alt={meal.name} />
      <h3>{meal.name}</h3>
      <p>JOD{meal.price}</p>
    </div>
  );
  
  export default MealCard;
  