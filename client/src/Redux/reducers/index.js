import { GET_RECIPES, RECIPE_DETAILS, DIET_TYPES } from "../actions/index";

const initialState = {
  db: [],
  api: [],
  details: {},
};

export default function rootReducer(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        db: action.payload.db,
        api: action.payload.api,
      };
    case RECIPE_DETAILS:
      return { ...state, details: action.payload };
    default:
      return state;
  }
}
