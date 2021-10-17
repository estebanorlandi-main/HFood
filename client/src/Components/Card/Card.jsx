import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Card.module.css";

function Card({ recipe }) {
  const theme = useSelector((state) => state.theme);

  const ordDiets = recipe.diets.sort();
  const diet = ordDiets.map((diet) => <li className={styles.diet}>{diet}</li>);

  return (
    <Link
      className={styles.cardContainer + ` ${theme ? styles.dark : ""}`}
      to={`/recipe/${recipe.id}`}
    >
      <div className={styles.card}>
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

          <ul className={styles.card__diets}>{diet}</ul>
        </div>
      </div>
    </Link>
  );
}
export default Card;
