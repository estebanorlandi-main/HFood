const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", (req, res) => {
  res.status(200).json({
    msg: "Recipes with query",
    desc: "Get a list of recipes with a query parameter if dosen't exist show a message",
  });
});
router.get("/recipes/:idRecipe", (req, res) => {
  res
    .status(200)
    .json({ msg: "Recipes with ID", desc: "Get details about a recipe" });
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
