export const GET_RECIPES = "GET_RECIPES";
export const RECIPE_DETAILS = "RECIPE_DETAILS";
export const DIET_TYPES = "DIET_TYPES";

export function getRecipes() {
  return (dispatch) =>
    fetch("http://localhost:3001/recipes")
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_RECIPES, payload: data }));
}
