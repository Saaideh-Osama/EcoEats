import "./MealCard.css";




const MealCard = ({ meal, onClick }) => (
  <div
    className="xmeal_card_unq"
    onClick={() => onClick(meal.id)}
    key={meal.id}
  >
    <img src={meal.image} alt={meal.name} className="xmeal_img_sq"  />   
    <h4 className="xmeal_title_txt">{meal.name}</h4>
    <div className="xmeal_price_box">
      <span className="xmeal_price_new">JOD {meal.price}</span>
      <span className="xmeal_price_old">JOD {meal.original_price}</span>
    </div>
  </div>
);

export default MealCard;
