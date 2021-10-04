require("dotenv").config();
const { API_KEY } = process.env;

const baseURL = "https://api.spoonacular.com/recipes";

module.exports = {
  complex: (query) =>
    base +
    `/complexSearch?query=${query}&apiKey=${API_KEY}&addRecipeInformation=true&number=100`,

  single: (id) => baseURL + `/${id}/information?apiKey=${API_KEY}`,
};
