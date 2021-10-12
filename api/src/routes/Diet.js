const { Router } = require("express");
const router = Router();

const { dbObjFormat } = require("../functions/objFormat");
const { complex } = require("../functions/urls");
const { Diet } = require("../db");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const diets = dbObjFormat(await Diet.findAll({ raw: true }));
    if (diets && diets.length)
      return res.status(200).json({ message: "Diets found", results: diets });

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
      .json({ message: "Diets saved", results: Object.values(arrDiets) });
  } catch (err) {
    return res.status(404).json({ message: "Something went wrong", err });
  }
});

module.exports = router;
