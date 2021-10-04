import "./Card.css";

function Card(props) {
  return (
    <div className="card">
      <img className="card__img" src={props.image} alt={props.title} />

      <div className="card__header">
        <span>Score {props.score}</span>
        <span>Health Score {props.healthScore}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{props.title}</h3>
        <ul className="card__diets">
          {props.diets
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
