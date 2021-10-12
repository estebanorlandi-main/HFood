import {
  GET_RECIPES,
  RECIPE_DETAILS,
  FILTER,
  DIET_TYPES,
  ERROR,
} from "../actions/index";

const initialState = {
  results: [],
  modified: [],
  details: {},
  error: undefined,
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
  a[order.by] =
    typeof a[order.by] === "string" ? a[order.by].toLowerCase() : a[order.by];
  b[order.by] =
    typeof b[order.by] === "string" ? b[order.by].toLowerCase() : b[order.by];

  if (order.type === 1) {
    return a[order.by] < b[order.by] ? -1 : 1;
  }
  if (order.type === -1) {
    return a[order.by] > b[order.by] ? -1 : 1;
  }
  return 0;
};

export default function rootReducer(state = initialState, action) {
  if (
    action.payload &&
    action.payload.err &&
    Object.keys(action.payload.err).length
  )
    return { ...initialState, error: action.payload };

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
        const r = new RegExp(`${search}`, "i");
        arr = [...arr].filter((recipe) => recipe.title.toLowerCase().match(r));
      }

      if (filters.length) arr = filter(arr, filters);
      if (order.type !== 0) arr = [...arr].sort((a, b) => sortBy(a, b, order));

      return { ...state, modified: arr };

    case RECIPE_DETAILS:
      return { ...state, details: action.payload.results };

    case DIET_TYPES:
      return { ...state, diets: action.payload.results };

    case ERROR:
      return { ...initialState, error: undefined };

    default:
      return state;
  }
}
