import { Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../Redux/actions/index";

import Button from "../../Components/Buttons/Buttons.jsx";
import Card from "../../Components/Card/Card.jsx";

import { results } from "./recipes.example.json";

function Home() {
  const dispatch = useDispatch();

  const apiRecipes = useSelector((state) => state.api);
  const dbRecipes = useSelector((state) => state.db);

  const handleOnClick = (e) => {
    dispatch(getRecipes());
  };

  return (
    <Fragment>
      <Button text="Get Recipes" onClick={handleOnClick} />
      <div className="grid">
        <h4>DB</h4>
      </div>

      <div className="grid">
        <h4>API</h4>
        {results.api
          ? results.api.map((recipe) => (
              <Card
                key={recipe.id}
                image={recipe.image}
                title={recipe.title}
                diets={recipe.diets}
              />
            ))
          : ""}

        {apiRecipes
          ? apiRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                image={recipe.image}
                title={recipe.title}
                diets={recipe.diets}
              />
            ))
          : ""}
      </div>
    </Fragment>
  );
}

export default Home;
