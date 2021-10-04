import { Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../Redux/actions/index";

import Button from "../../Components/Buttons/Buttons.jsx";
import Filters from "../../Components/Filters/Filters.jsx";
import Card from "../../Components/Card/Card.jsx";

function Home() {
  const dispatch = useDispatch();

  const apiRecipes = useSelector((state) => state.results);
  const filtered = useSelector((state) => state.filtered);

  const handleOnClick = (e) => {
    dispatch(getRecipes());
  };

  return (
    <Fragment>
      <Button type="primary" text="Get Recipes" onClick={handleOnClick} />

      <div className="col-2">
        <Filters />

        {filtered.length ? (
          <div>
            <h2>Filtered</h2>
            <span className="f-small">
              {apiRecipes.length} / {filtered.length}
            </span>
            <div className="grid">
              {filtered
                ? filtered.map((recipe) => (
                    <Card
                      key={recipe.id}
                      image={recipe.image}
                      title={recipe.title}
                      diets={recipe.diets}
                      score={recipe.score}
                      healthScore={recipe.healthScore}
                    />
                  ))
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}

        {filtered.length ? (
          ""
        ) : (
          <div>
            <h2>API</h2>
            <span className="f-small">
              {apiRecipes.length} / {apiRecipes.length}
            </span>
            <div className="grid">
              {apiRecipes
                ? apiRecipes.map((recipe) => (
                    <Card
                      key={recipe.id}
                      image={recipe.image}
                      title={recipe.title}
                      diets={recipe.diets}
                      score={recipe.score}
                      healthScore={recipe.healthScore}
                    />
                  ))
                : ""}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Home;
