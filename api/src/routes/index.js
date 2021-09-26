require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const complex = (information = false, page = 0, number = 100) =>
  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=${information}&offset=${page}&number=${number}`;

const single = (id) =>
  `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

router.get("/recipes", async (req, res) => {
  const { data } = await axios.get(complex(true));

  if (!data) return res.status(400).json({ err: "Spoonacular API error" });

  return res.status(200).json(data);
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(single(id));
  console.log(data);

  if (!data) return res.status(400).json({ err: "Spoonacular API error" });

  return res.status(200).json(data);
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
