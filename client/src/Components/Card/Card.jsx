import { Link } from "react-router-dom";

import styles from "./Card.module.css";

function Card({ recipe }) {
  return (
    <Link className={styles.cardContainer} to={`/recipe/${recipe.id}`}>
      <div className={styles.card}>
        <span
          className={`${styles.from} ${
            recipe.isDB ? styles.database : styles.api
          }`}
        >
          {recipe.isDB ? "Database" : "API"}
        </span>
        <img
          className={styles.card__img}
          src={recipe.image}
          alt={recipe.title}
        />
        <div className={styles.card__header}>
          <span>Score {recipe.score}</span>
          <span>Health Score {recipe.healthScore}</span>
        </div>
        <div className={styles.card__body}>
          <h3 className={styles.card__title}>{recipe.title}</h3>
          <ul className={styles.card__diets}>
            {recipe.diets
              .sort((a, b) => a.length - b.length)
              .map((diet) => (
                <li className={styles.diet} key={diet}>
                  {diet}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
export default Card;
