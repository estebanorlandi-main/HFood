export default function validate({
  title,
  summary,
  score,
  healthScore,
  steps,
  diets,
}) {
  const errors = {};

  if (summary.length < 10 || summary.length > 1000)
    errors.summary = "Summary length 10-1000";

  if (score < 0 || score > 100) errors.score = "Score range is 0-100";

  if (healthScore < 0 || healthScore > 100)
    errors.healthScore = "Health Score range is 0-100";

  if (!Array.isArray(steps) || steps.length < 1 || steps.length > 10)
    errors.steps = "Steps range 1-10";

  console.log(errors);
  console.log(steps);
  return errors;
}
