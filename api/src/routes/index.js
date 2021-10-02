require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");

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
    const query = { raw: true, include: [Diet] };
    if (name) query.where = { name };

    const dbData = await Recipe.findAll(query);

    const { data } = await axios.get(complex(name));
    const apiData = data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      diets: recipe.diets,
    }));

    if (!dbData.length && !apiData.length) throw Error();

    const results = { db: dbData, api: apiData };

    return res.status(200).json(CreateResponse("Recipes founded", results, {}));
  } catch (err) {
    return res.status(404).json(CreateResponse("Recipes not found", null, err));
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
    const dietObj = await Diet.findAll({
      where: { name: { [Op.or]: diet } },
      include: [Recipe],
    });

    const newRecipe = await Recipe.create(
      {
        name,
        resume,
        score,
        level,
        step,
      },
      { include: [Diet] }
    );

    await newRecipe.addDiets(dietObj);

    return res
      .status(200)
      .json(CreateResponse("Recipe Created", [newRecipe], {}));
  } catch (err) {
    return res
      .status(400)
      .json(CreateResponse("Error creating recipe", [], err));
  }
});

module.exports = router;
