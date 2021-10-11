const titleValidate = (value) => {
  if (value.length < 3) return false;
  if (value.length > 32) return false;
  return true;
};

const summaryValidate = (value) => {
  if (value.length < 15) return false;
  if (value.length > 1000) return false;
  return true;
};

const scoreValidate = (value) => {
  if (!/[0-9]/.test(value)) return false;
  if (value < 0) return false;
  if (value > 100) return false;
  return true;
};

const stepValidate = (value) => {
  if (value.length < 3) return false;
  if (value > 500) return false;
  return true;
};

module.exports = async function validate({
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
