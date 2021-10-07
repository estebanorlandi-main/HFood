import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getDetails } from "../../Redux/actions/index";

import "./Recipe.css";

function Recipe(props) {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  const details = useSelector((state) => state.details);
  console.log(details);

  useEffect(() => {
    if (firstLoad) {
      dispatch(getDetails(props.id));
      setFirstLoad(false);
    }
  }, [firstLoad, props, dispatch]);

  return (
    <div>
      {details.image ? (
        <div className="recipe__image-container">
          <img src={details.image} alt={details.title} />
        </div>
      ) : (
        ""
      )}

      <div className="recipe__body">
        <h1>{details.title ? details.title : ""}</h1>
        <div className="recipe__scores">
          <span className="f-small">
            Score {details.score !== undefined ? details.score : ""}
          </span>
          <span className="f-small">
            Health Score
            {details.healthScore !== undefined ? details.healthScore : ""}
          </span>
        </div>

        {details.summary ? (
          <Fragment>
            <h3> Summary </h3>
            <p className="recipe__summary">{details.summary}</p>
          </Fragment>
        ) : (
          ""
        )}

        {details.steps && details.steps.length ? (
          <Fragment>
            <br />
            <h3> Steps </h3>
            <ul className="recipe__steps">
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
            <ul className="recipe__diets">
              {details.diets.map((diet) => (
                <li key={diet} className="">
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
