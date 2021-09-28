import Card from "./Card";
import styles from "./Cards.module.css";

function Cards({ recipes }) {
  return (
    <div className="mt-2">
      <div className={`${styles.grid}`}>
        {recipes
          ? recipes.map((recipe) => (
              <Card
                key={recipe.id}
                id={recipe.id}
                name={recipe.title}
                diets={recipe.diets}
                img={recipe.image}
              />
            ))
          : ""}
      </div>
    </div>
  );
}
export default Cards;
