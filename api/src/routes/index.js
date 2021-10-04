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
    const query = { include: [Diet] };
    if (name) query["where"] = { name };

    const dbData = (await Recipe.findAll(query)).map((recipe) => {
      const json = recipe.toJSON();
      return {
        ...json,
        diets: json.diets.map((diet) => diet.name),
        isDB: true,
      };
    });

    const { data } = await axios.get(complex(name));

    const apiData = data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      diets: recipe.diets,
      score: recipe.spoonacularScore,
      healthScore: recipe.healthScore,
      isDB: false,
    }));

    if (!dbData.length && !apiData.length) throw Error();

    const results = [...dbData, ...apiData];

    return res
      .status(200)
      .json(CreateResponse("Recipes founded", results, null));
  } catch (err) {
    console.log(err);
    return res.status(404).json(CreateResponse("Recipes not found", null, err));
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id.match(/\-+/)) {
      const dbData = await Recipe.findOne({ raw: true, where: { id } });
      if (dbData)
        return res
          .status(200)
          .json(CreateResponse("Recipe found", dbData, null));
    }

    const { data: apiData } = await axios.get(single(id));
    if (apiData.data && apiData.data.status === 404) throw Error();

    const {
      id: idResult,
      title,
      image,
      summary,
      diets,
      instructions,
    } = apiData;

    const x = {
      id: idResult,
      title,
      image,
      summary: summary.replaceAll(/<\/?[^>]+(>|$)/g, ""),
      diets,
      instructions: instructions.replaceAll(/<\/?[^>]+(>|$)/g, ""),
    };

    return res.status(200).json(CreateResponse("Recipe found", x, null));
  } catch (err) {
    return res.status(404).json(CreateResponse("Recipe not found", null, err));
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
          arrDiets[getData.name] = getData;
        }
      }
    }
    return res
      .status(200)
      .json(CreateResponse("Diets saved", Object.values(arrDiets), null));
  } catch (err) {
    return res
      .status(400)
      .json(CreateResponse("Error creating diets", null, err));
  }
});

router.post("/recipe", async (req, res) => {
  const { name, resume, score, level, step, diet } = req.body;

  // diet = ["", "", ""]

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

    const response = await Recipe.findOne({
      where: { id: newRecipe.id },
      include: [Diet],
    });

    return res
      .status(200)
      .json(CreateResponse("Recipe Created", response, null));
  } catch (err) {
    return res
      .status(400)
      .json(CreateResponse("Error creating recipe", null, err));
  }
});

router.get("/test", async (req, res) => {
  const vegan = await Diet.create({ name: "vegan" }, { include: [Recipe] });
  const vegetarian = await Diet.create(
    { name: "vegetarian" },
    { include: [Recipe] }
  );

  const newRecipe = await Recipe.create({
    title: "Berry",
    resume: "This is the resume",
    score: 10,
    level: 10,
    step: "Steps",
  });

  await newRecipe.addDiets([vegan, vegetarian]);

  const recipe = await Recipe.findOne({
    where: { id: newRecipe.id },
    include: [Diet],
  });

  res.status(200).json(recipe);
});

module.exports = router;
