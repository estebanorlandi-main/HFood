const titleValidate = (value) => {
  if (value.length < 3) return "Min length - 3";
  if (value.length > 32) return "Max length - 32";
  return false;
};

const summaryValidate = (value) => {
  if (value.length < 15) return "Min length - 15";
  if (value.length > 1000) return "max length - 1000";
  return false;
};

const scoreValidate = (value) => {
  if (!/[0-9]/.test(value)) return "Score is a number";
  if (value < 0) return "Min - 0";
  if (value > 100) return "Max - 100";
  return false;
};

const stepValidate = (value) => {
  if (value.length < 3) return "Min - 3";
  if (value > 500) return "Max - 500";
  return false;
};

export default function validate(name, value) {
  if (name === "title") return titleValidate(value);
  if (name === "summary") return summaryValidate(value);
  if (name === "score") return scoreValidate(value);
  if (name === "healthScore") return scoreValidate(value);
  if (name === "step") return stepValidate(value);
}
