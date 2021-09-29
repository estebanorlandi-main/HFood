import { GET_RECIPES, RECIPE_DETAILS, DIET_TYPES } from "../actions/index";

const initialState = {
  recipes: [],
  details: {},
  page: 0,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case RECIPE_DETAILS:
      return { ...state, details: action.payload.results };
    default:
      return state;
  }
}
