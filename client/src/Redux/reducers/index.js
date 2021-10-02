import { GET_RECIPES, RECIPE_DETAILS } from "../actions/index";

const initialState = {
  db: [],
  api: [],
  details: {},
};

export default function rootReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        db: action.payload.results.db,
        api: action.payload.results.api,
      };
    case RECIPE_DETAILS:
      return { ...state, details: action.payload };
    default:
      return state;
  }
}
