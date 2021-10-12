const titleValidate = (value) => {
  if (!/^[\w\-\s\,\(\)\:\']{3,64}$/i.test(value))
    throw new Error({ message: "Invalid title" });
  return true;
};

const summaryValidate = (value) => {
  if (!/^[\w\-\s\,\(\)\:\'\.]{15,1000}$/i.test(value))
    throw new Error({ message: "Invalid summary" });
  return true;
};

const scoreValidate = (value) => {
  if (value < 0) throw new Error({ message: "Score is lower than 0" });
  if (value > 100) throw new Error({ message: "Score is greater than 0" });
  return true;
};

const stepValidate = (value) => {
  if (!/^[\w\-\s\,\(\)\:\']{3,64}$/i.test(value))
    throw new Error({ message: "Invalid step" });
  return true;
};

module.exports = function validate({
  title,
  summary,
  score,
  healthScore,
  steps,
}) {
  const isValid = [];

  if (title) isValid.push(titleValidate(title));
  else isValid.push(false);

  if (summary) isValid.push(summaryValidate(summary));
  else isValid.push(false);

  if (score) isValid.push(scoreValidate(score));
  else isValid.push(false);

  if (healthScore) isValid.push(scoreValidate(healthScore));
  else isValid.push(false);

  if (steps) isValid.push(...steps.map((step) => stepValidate(step)));
  else isValid.push(false);

  return isValid.every((value) => value === true);
};
