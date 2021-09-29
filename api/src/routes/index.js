require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const axios = require("axios");

const { Diet, Recipe } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const baseURL = "https://api.spoonacular.com/recipes";

const complex = (information = false, query, number = 100) =>
  baseURL +
  `/complexSearch?${
    query ? `query=${query}&` : ""
  }apiKey=${API_KEY}&addRecipeInformation=${information}&number=${number}`;

const single = (id) => `${baseURL}/${id}/information?apiKey=${API_KEY}`;

router.get("/recipes", async (req, res) => {
  const { name, page } = req.query;

  const dbData = await Recipe.findAll({ raw: true, where: { name } });
  const { data: apiData } = await axios.get(complex(true, name));

  const pagesDB = Math.ceil(dbData.length / 9);
  const dbRecipes = dbData.slice(page * 9, page * 9 + 9);

  const pagesAPI = Math.ceil(apiData.results.length / 9);
  const apiRecipes = apiData.results.slice(page * 9, page * 9 + 9);

  const results = {
    db: { results: dbRecipes, page: parseInt(page), pages: pagesDB },
    api: { results: apiRecipes, page: parseInt(page), pages: pagesAPI },
  };

  // if (!data) return res.status(400).json({ err: "Spoonacular API error" });
  return res.status(200).json(results);
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(single(id));

  if (!data) return res.status(400).json({ err: "Spoonacular API error" });

  return res.status(200).json(data.results);
});

router.get("/types", async (req, res) => {
  let diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];

  diets.forEach(async (name) => {
    await Diet.findOrCreate({
      where: { name },
    });
  });

  diets = await Diet.findAll({});

  res.status(200).json({
    diets,
    totalDiets: diets.length,
  });
});

router.post("/recipe", (req, res) => {
  const { name, resume, score, level, step } = req.body;

  Recipe.create({ name, resume, score, level, step });

  res.status(200).json({
    msg: req.body,
  });
});

router.get("/fill", (req, res) => {
  const obj = {
    name: "berry",
    resume: "this is the resume",
    score: 10,
    level: 10,
    step: "this is the step",
  };
  for (let i = 0; i < 20; i++) {
    Recipe.create(obj);
  }
  res.json({ msg: "ok" });
});

module.exports = router;
