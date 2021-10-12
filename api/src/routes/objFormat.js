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

module.exports = {
  dbObjFormat,
  apiObjFormat,
};
