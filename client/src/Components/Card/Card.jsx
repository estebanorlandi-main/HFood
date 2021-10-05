import "./Card.css";

function Card({ recipe }) {
  return (
    <div className="card">
      <span className={`from ${recipe.isDB ? "Database" : "API"}`}>
        {recipe.isDB ? "Database" : "API"}
      </span>
      <img className="card__img" src={recipe.image} alt={recipe.title} />
      <div className="card__header">
        <span>Score {recipe.score}</span>
        <span>Health Score {recipe.healthScore}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{recipe.title}</h3>
        <ul className="card__diets">
          {recipe.diets
            .sort((a, b) => a.length - b.length)
            .map((diet) => (
              <li className="diet" key={diet}>
                {diet}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export default Card;
