import { GET_RECIPES, RECIPE_DETAILS, BY_DIET } from "../actions/index";
import test from "../../Pages/Home/recipes.example.json";

const initialState = {
  results: test.results,
  filtered: [],
  details: {},
};

export default function rootReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        results: action.payload.results,
      };
    case BY_DIET:
      return {
        ...state,
        filtered: state.results.filter(({ diets }) => {
          const data = Object.entries(action.payload);
          let x = 0;
          for (let i = 0; i < data.length; i++)
            if (data[i][1] && diets.includes(data[i][0])) x++;
          return x > 0;
        }),
      };
    case RECIPE_DETAILS:
      return { ...state, details: action.payload };
    default:
      return state;
  }
}
