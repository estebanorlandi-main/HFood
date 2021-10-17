const { Router } = require("express");
const router = Router();

// db connection
const { Diet, Recipe } = require("../db");
const { Op } = require("sequelize");

// data
const { dbObjFormat, apiObjFormat } = require("../functions/objFormat");
const validate = require("../functions/validate");

// fetch
const { complex, single } = require("../functions/urls");
const axios = require("axios");

router.get("/", async (req, res) => {
  const { name = "" } = req.query;

  try {
    const query = { include: [Diet] };
    if (name) query["where"] = { name };

    const dbData = dbObjFormat(await Recipe.findAll(query));
    const apiData = apiObjFormat(await axios.get(complex(name)));

    let results = [];
    if (!dbData && !apiData) throw Error({ message: "Recipes not found" });
    if (dbData) results = [...dbData];
    if (apiData) results = [...results, ...apiData];

    return res.status(200).json({ messaage: "Recipes founded", results });
  } catch (err) {
    return res.status(404).json({ message: "Something went wrong", err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id.includes("-")) {
      const dbData = dbObjFormat(
        await Recipe.findOne({ where: { id }, include: [Diet] })
      );

      if (dbData) {
        return res
          .status(200)
          .json({ message: "Recipe found", results: dbData });
      }
    }

    const apiData = apiObjFormat(await axios.get(single(id)));
    if (!apiData) throw Error("Recipe not found");

    return res.status(200).json({ message: "Recipe found", results: apiData });
  } catch (err) {
    return res.status(404).json({ message: "Recipe not found", err });
  }
});

router.post("/", async (req, res) => {
  /*
   *
   * if (!validate(req.body))
   * return res
   *   .status(400)
   *   .json({ message: "Invalid Data", err: { status: 400 } });
   *
   */

  try {
    validate(req.body);
    const { title, summary, image, score, healthScore, steps, diets } =
      req.body;

    const dietsFound = diets.length
      ? await Diet.findAll({
          where: { name: { [Op.or]: diets } },
          include: [Recipe],
        })
      : [];

    const newRecipe = await Recipe.create(
      {
        title,
        summary,
        image,
        score,
        healthScore,
        steps,
      },
      { include: [Diet] }
    );

    if (dietsFound.length) await newRecipe.addDiets(dietsFound);

    const response = dbObjFormat(
      await Recipe.findOne({
        where: { id: newRecipe.id },
        include: [Diet],
      })
    );

    return res
      .status(200)
      .json({ message: "Recipe Created", results: response, created: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Something went wrong", err, created: false });
  }
});

module.exports = router;
