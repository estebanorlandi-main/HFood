import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getDetails } from "../../Redux/actions/index";

import styles from "./Recipe.module.css";

function Recipe(props) {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);

  const details = useSelector((state) => state.details);

  useEffect(() => {
    if (firstLoad) {
      dispatch(getDetails(props.id));
      setFirstLoad(false);
    }
  }, [firstLoad, props, dispatch]);

  return (
    <div className={styles.recipe}>
      {details.image ? (
        <div className={styles.recipe__image}>
          <img src={details.image} alt={details.title} />
        </div>
      ) : (
        ""
      )}

      <div className={styles.recipe__body}>
        <h1>{details.title ? details.title : ""}</h1>
        {details.score !== undefined && details.healthScore !== undefined ? (
          <div className={styles.recipe__scores}>
            <span className="f-small">Score {details.score}</span>
            <span className="f-small">Health Score {details.healthScore}</span>
          </div>
        ) : (
          ""
        )}

        {details.summary ? (
          <Fragment>
            <h3> Summary </h3>
            <p className={styles.recipe__summary}>{details.summary}</p>
          </Fragment>
        ) : (
          ""
        )}

        {details.steps && details.steps.length ? (
          <Fragment>
            <br />
            <h3> Steps </h3>
            <ul className={styles.recipe__steps}>
              {details.steps.map((step, i) => (
                <li key={i}>
                  <p>{step}</p>
                </li>
              ))}
            </ul>
          </Fragment>
        ) : (
          ""
        )}

        {details.diets && details.diets.length ? (
          <Fragment>
            <br />
            <h3> Diets </h3>
            <ul className={styles.recipe__diets}>
              {details.diets
                .sort((a, b) => a.length - b.length)
                .map((diet) => (
                  <li key={diet} className={styles.recipe__diet}>
                    {diet}
                  </li>
                ))}
            </ul>
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Recipe;
