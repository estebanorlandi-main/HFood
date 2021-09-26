import { GET_RECIPES, RECIPE_DETAILS, DIET_TYPES } from "../actions/index";

const initialState = {};

export default function rootReducer(state = initialState, action) {
  //console.log(state);
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload };
    default:
      return state;
  }
}
