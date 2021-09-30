export const GET_RECIPES = "GET_RECIPES";
export const RECIPE_DETAILS = "RECIPE_DETAILS";
export const DIET_TYPES = "DIET_TYPES";

export function getRecipes(name) {
  return (dispatch) =>
    fetch(`http://localhost:3001/recipes?name=${name}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_RECIPES, payload: data }));
}

export function getDetails(id) {
  return (dispatch) =>
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: RECIPE_DETAILS, payload: data }));
}
