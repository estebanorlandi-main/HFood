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
    if (!dbObj.length) return null;
    return dbObj.map((recipe) => {
      if (recipe.name) return recipe.name;
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

const apiObjFormat = ({ data }) => {
  if (Array.isArray(data.results)) {
    const { results } = data;
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

  if (!Object.keys(data).length) return null;
  if (data.status === 404) return null;

  const steps = data.analyzedInstructions[0];
  delete data.analyzedInstructions;

  return {
    ...data,
    score: data.spoonacularScore,
    healthScore: data.healthScore,
    summary: data.summary.replaceAll(/<\/?[^>]+(>|$)/g, ""),
    steps: steps ? steps.steps.map(({ step }) => step) : [],
  };
};

router.get("/recipes", async (req, res) => {
  const { name = "" } = req.query;

  try {
    const query = { include: [Diet] };
    if (name) query["where"] = { name };

    const dbData = dbObjFormat(await Recipe.findAll(query));
    const apiData = apiObjFormat(await axios.get(complex(name)));

    let results = [];
    if (!dbData && !apiData) throw Error({ message: "Recipes not found :(" });
    if (dbData) results = [...dbData];
    if (apiData) results = [...results, ...apiData];

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
    if (id.includes("-")) {
      const dbData = dbObjFormat(
        await Recipe.findOne({ where: { id }, include: [Diet] })
      );

      if (dbData)
        return res
          .status(200)
          .json(CreateResponse("Recipe found", dbData, null));
    }

    const apiData = apiObjFormat(await axios.get(single(id)));
    if (!apiData) throw Error();

    return res.status(200).json(CreateResponse("Recipe found", apiData, null));
  } catch (err) {
    console.log(err);
    return res.status(404).json(CreateResponse("Recipe not found", null, err));
  }
});

router.get("/types", async (req, res) => {
  try {
    const diets = dbObjFormat(await Diet.findAll({ raw: true }));
    if (diets && diets.length)
      return res.status(200).json(CreateResponse("Diets found", diets, null));

    const { data: apiData } = await axios.get(complex(""));
    const arrDiets = {};

    for (let recipe of apiData.results) {
      for (let diet of recipe.diets) {
        if (!arrDiets[diet]) {
          let [getData, _] = await Diet.findOrCreate({
            where: { name: diet },
          });
          getData = getData.toJSON();
          if (getData) arrDiets[getData.name] = getData.name;
        }
      }
    }
    return res
      .status(200)
      .json(CreateResponse("Diets saved", Object.values(arrDiets), null));
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json(CreateResponse("Error creating diets", null, err));
  }
});

router.post("/recipe", async (req, res) => {
  const { title, summary, score, healthScore, steps, diets } = req.body;

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
        steps,
      },
      { include: [Diet] }
    );

    await newRecipe.addDiets(dietsFound);

    const response = dbObjFormat(
      await Recipe.findOne({
        where: { id: newRecipe.id },
        include: [Diet],
      })
    );

    return res
      .status(200)
      .json(CreateResponse("Recipe Created", response, null));
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json(CreateResponse("Error creating recipe", null, err));
  }
});

module.exports = router;
