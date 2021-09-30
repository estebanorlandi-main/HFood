import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from "../../Redux/actions/index";

import styles from "./Card.module.css";

function Card(props) {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);

  useEffect(() => {
    if (details) console.log(details);
  });
  const handleClick = (e) => {
    dispatch(getDetails(props.id));
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      {}
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
