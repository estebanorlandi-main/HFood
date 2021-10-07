// Routes
export const GET_RECIPES = "GET_RECIPES";
export const RECIPE_DETAILS = "RECIPE_DETAILS";
export const DIET_TYPES = "DIET_TYPES";
export const CREATE_RECIPE = "CREATE_RECIPE";

// Pagination
export const PAGE = "PAGE";

// Filters
export const FILTER = "FILTER";

export function getRecipes(name = "") {
  return (dispatch) =>
    fetch(`http://localhost:3001/recipes?name=${name}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_RECIPES, payload: data }))
      .catch((err) => dispatch({ type: GET_RECIPES, payload: err }));
}

export function getDetails(id) {
  return (dispatch) =>
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: RECIPE_DETAILS, payload: data }))
      .catch(console.log);
}

export function getTypes() {
  return (dispatch) =>
    fetch(`http://localhost:3001/types`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: DIET_TYPES, payload: data }))
      .catch(console.log);
}

export function createRecipe(body) {
  return (dispatch) =>
    fetch(`http://localhost:3001/recipe`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: CREATE_RECIPE, payload: data }))
      .catch(console.log);
}

export function filter(filters) {
  return { type: FILTER, payload: filters };
}

export function page(number) {
  return { type: PAGE, payload: number };
}
