const { Router } = require("express");
const router = Router();

const dietRouter = require("./Diet");
const recipeRouter = require("./Recipe");

router.use("/recipe", recipeRouter);
router.use("/diet", dietRouter);

module.exports = router;
