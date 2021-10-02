require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const router = Router();

const axios = require("axios");
const { Diet, Recipe } = require("../db");

const baseURL = "https://api.spoonacular.com/recipes";
const complex = (query) =>
  baseURL +
  `/complexSearch?query=${query}&apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
const single = (id) => baseURL + `/${id}/information?apiKey=${API_KEY}`;

const CreateResponse = (message, results, error) => {
  return {
    message,
    results,
    error,
  };
};

router.get("/recipes", async (req, res) => {
  const { name = "" } = req.query;

  try {
    const dbData = await Recipe.findAll({
      raw: true,
      where: { name },
      include: Diet,
    }).map((recipe) => ({ ...recipe, isDB: true }));

    const { data: apiData } = await axios.get(complex(name));

    if (!dbData.length && !apiData.results.length) throw Error();

    const results = [...dbData, ...apiData.results];

    return res.status(200).json(CreateResponse("Recipes founded", results, {}));
  } catch (err) {
    return res.status(404).json(CreateResponse("Recipes not found", [], err));
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const results = [];

  try {
    if (id.match(/\-+/)) {
      const dbData = await Recipe.findOne({ raw: true, where: { id } });
      if (dbData)
        return res.status(200).json(CreateResponse("Recipe found", dbData, {}));
      else throw Error();
    }

    const { data: apiData } = await axios.get(single(id));
    if (apiData.data.status === 404) throw Error();

    return res.status(200).json(CreateResponse("Recipe found", apiData, {}));
  } catch (err) {
    return res.status(404).json(CreateResponse("Recipe not found", [], err));
  }
});

router.get("/types", async (req, res) => {
  try {
    const diets = await Diet.findAll({ raw: true });
    if (diets.length) return res.status(200).json({ diets });

    const { data: apiData } = await axios.get(complex(""));
    const arrDiets = {};
    for (let recipe of apiData.results) {
      for (let diet of recipe.diets) {
        if (!arrDiets[diet]) {
          const [getData, _] = await Diet.findOrCreate({
            raw: true,
            where: { name: diet },
          });

          arrDiets[diet] = getData;
        }
      }
    }
    return res.status(200).json({ diets: Object.values(arrDiets) });
  } catch (err) {
    return res
      .status(400)
      .json(CreateResponse("Error creating diets", [], err));
  }
});

router.post("/recipe", async (req, res) => {
  const { name, resume, score, level, step, diet } = req.body;

  try {
    const dietObj = await Diet.findOne({
      raw: true,
      where: { name: diet.toLowerCase() },
    });

    const newRecipe = await Recipe.create(
      {
        name,
        resume,
        score,
        level,
        step,
      },
      {
        include: [Diet],
      }
    );

    await newRecipe.addDiets([dietObj]);

    return res
      .status(200)
      .json(CreateResponse("Recipe Created", [newRecipe.toJSON()], {}));
  } catch (err) {
    return res
      .status(400)
      .json(CreateResponse("Error creating recipe", [], err));
  }
});

router.get("/test", async (req, res) => {
  const vegan = await Diet.create({ name: "vegan" }, { include: [Recipe] });

  const vegetarian = await Diet.create(
    { name: "vegetarian" },
    { include: [Recipe] }
  );

  const pescetarian = await Diet.create(
    { name: "pescetarian" },
    { include: [Recipe] }
  );

  const recipe = {
    name: "Berry",
    resume: "This is the resume",
    score: 10,
    level: 10,
    step: "Hola Mundo!",
  };

  const recipe2 = {
    name: "Fries",
    resume: "This is the resume",
    score: 10,
    level: 10,
    step: "Hola Mundo!",
  };

  const newRecipe = await Recipe.create(recipe, { include: [Diet] });
  const newRecipe2 = await Recipe.create(recipe2, { include: [Diet] });

  const recipes = await newRecipe.addDiets([vegan, pescetarian]);
  const diets = await newRecipe2.addDiets([vegetarian, vegan]);

  const results = [...recipes, ...diets];

  console.log(results);

  res.status(200).json(results);
});

module.exports = router;
