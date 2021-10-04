const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");

const axios = require("axios");
const { Diet, Recipe } = require("../db");

const { complex, single } = require("./urls");

const CreateResponse = (message, results, error) => {
  return {
    message,
    results,
    error,
  };
};

const dbObjFormat = (dbObj) => {
  if (Array.isArray(dbObj)) {
    if (!dbObj.length) null;
    return dbObj.map((recipe) => {
      const obj = recipe.toJSON();
      return {
        ...obj,
        diets: obj.diets.map((diet) => diet.name),
        isDB: true,
      };
    });
  }

  if (!Object.keys(dbObj).length) return null;
  const obj = dbObj.toJSON();
  return { ...obj, diets: obj.diets.map((diet) => diet.name), isDB: true };
};

const apiObjFormat = ({ data: { results } }) => {
  if (Array.isArray(results)) {
    if (!results.length) return null;
    return results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      diets: recipe.diets,
      score: recipe.spoonacularScore,
      healthScore: recipe.healthScore,
      isDB: false,
    }));
  }

  if (!Object.keys(results).length) return null;
  if (apiData.data.status === 404) return null;

  const { id, title, image, summary, diets, instructions } = results;
  return {
    id,
    title,
    image,
    summary: summary.replaceAll(/<\/?[^>]+(>|$)/g, ""),
    diets,
    instructions: instructions.replaceAll(/<\/?[^>]+(>|$)/g, ""),
  };
};

router.get("/recipes", async (req, res) => {
  const { name = "" } = req.query;

  try {
    const query = { include: [Diet] };
    if (name) query["where"] = { name };

    const dbData = dbObjFormat(await Recipe.findAll(query));
    const apiData = apiObjFormat(await axios.get(complex(name)));

    if (!dbData.length && !apiData.length)
      throw Error({ message: "Recipes not found :(" });

    const results = [...dbData, ...apiData];

    return res
      .status(200)
      .json(CreateResponse("Recipes founded", results, null));
  } catch (err) {
    return res.status(404).json(CreateResponse("Recipes not found", null, err));
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dbData = dbObjFormat(
      await Recipe.findOne({ where: { id }, include: [Diet] })
    );

    if (dbData)
      return res.status(200).json(CreateResponse("Recipe found", dbData, null));

    const apiData = apiObjFormat(await axios.get(single(id)));
    if (apiData) throw Error();

    return res.status(200).json(CreateResponse("Recipe found", apiData, null));
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
  const { title, summary, score, healthScore, instructions, diets } = req.body;

  try {
    const dietsFound = await Diet.findAll({
      where: { name: { [Op.or]: diets } },
      include: [Recipe],
    });

    if (!dietsFound.length) throw Error("Diet not found");

    const newRecipe = await Recipe.create(
      {
        title,
        summary,
        score,
        healthScore,
        instructions,
      },
      { include: [Diet] }
    );

    await newRecipe.addDiets(dietObj);

    const response = apiObjFormat(
      await Recipe.findOne({
        where: { id: newRecipe.id },
        include: [Diet],
      })
    );

    return res
      .status(200)
      .json(CreateResponse("Recipe Created", response, null));
  } catch (err) {
    return res
      .status(400)
      .json(CreateResponse("Error creating recipe", null, err));
  }
});

module.exports = router;
