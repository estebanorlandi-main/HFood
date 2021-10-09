import {
  GET_RECIPES,
  RECIPE_DETAILS,
  FILTER,
  DIET_TYPES,
  SEARCH,
} from "../actions/index";

const initialState = {
  results: [],
  modified: [],
  details: {},
  error: {},
  diets: [],
};

const filter = (arr1, arr2) => {
  if (!arr1.length && !arr2.length) return [];
  return arr1.filter((recipe) => {
    for (let i = 0; i < arr2.length; i++) {
      if (recipe.diets.includes(arr2[i])) return true;
    }
    return false;
  });
};

const sortBy = (a, b, order) => {
  if (order.type === 1) {
    return a[order.by] < b[order.by];
  }
  if (order.type === -1) {
    return a[order.by] > b[order.by];
  }
};

export default function rootReducer(state = initialState, action) {
  if (action.payload && action.payload.error)
    return { ...state, error: action.payload.error };

  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        results: action.payload.results,
        modified: action.payload.results,
      };

    case FILTER:
      const { order, filters, search } = action.payload;

      let arr = state.results;

      if (search) {
        const r = new RegExp(`${search.toLowerCase()}`);
        arr = [...arr].filter((recipe) => recipe.title.toLowerCase().match(r));
      }

      if (filters.length) arr = filter(arr, filters);

      if (order.type !== 0) arr = [...arr].sort((a, b) => sortBy(a, b, order));

      return { ...state, modified: arr };

    case RECIPE_DETAILS:
      return { ...state, details: action.payload.results };

    case DIET_TYPES:
      return { ...state, diets: action.payload.results };

    default:
      return state;
  }
}
