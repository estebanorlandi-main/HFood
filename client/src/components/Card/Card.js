import styles from "./Card.module.css";

function Card(props) {
  return (
    <div className={styles.card}>
      <img src={props.img} />
      <div className={styles.card__info}>
        <h4 className={styles.card__title}>{props.name}</h4>
      </div>
      <ul className={styles.diets}>
        {props.diets.map((diet) => (
          <li key={diet}>{diet}</li>
        ))}
      </ul>
    </div>
  );
}
export default Card;
