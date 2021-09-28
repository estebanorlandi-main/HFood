require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const axios = require("axios");
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
  const { data } = await axios.get(complex(true, name));

  const results = data.results.slice(page * 9, page * 9 + 9);

  if (!data) return res.status(400).json({ err: "Spoonacular API error" });
  return res.status(200).json({ results, page: parseInt(page) });
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(single(id));

  if (!data) return res.status(400).json({ err: "Spoonacular API error" });

  return res.status(200).json(data.results);
});

router.get("/types", (req, res) => {
  res.status(200).json({
    msg: "Types",
    desc: "Get all the types of diet or return from spoonacular if dosen't exist",
  });
});

router.post("/recipe", (req, res) => {
  res.status(200).json({
    msg: "Recipe",
    desc: "Get data from controlled form and create a new recipe",
  });
});

module.exports = router;
