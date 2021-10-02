import { GET_RECIPES, RECIPE_DETAILS, DIET_TYPES } from "../actions/index";

const initialState = {
  results: [],
  details: {},
};

export default function rootReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        results: [...action.payload.db, ...action.payload.api],
      };
    case RECIPE_DETAILS:
      return { ...state, details: action.payload };
    default:
      return state;
  }
}
