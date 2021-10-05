import {
  GET_RECIPES,
  RECIPE_DETAILS,
  FILTER,
  DIET_TYPES,
} from "../actions/index";

const initialState = {
  results: [],
  modified: [],
  details: {},
  diets: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        results: action.payload.results,
        modified: action.payload.results,
      };

    case FILTER:
      const { order } = action.payload;
      if (order.type === 0) return { ...state, modified: state.results };
      if (order.by) {
        const sorted = [...state.results].sort((a, b) =>
          order.type === 1
            ? a[order.by] < b[order.by]
            : a[order.by] > b[order.by]
        );

        return {
          ...state,
          modified: sorted,
        };
      }
      return { ...state };

    case RECIPE_DETAILS:
      return { ...state, details: action.payload.results };

    case DIET_TYPES:
      return { ...state, diets: action.payload.results };

    default:
      return state;
  }
}
