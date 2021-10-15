const titleValidate = (value) => {
  const r = /^[\w\-\s,():']{3,64}$/i;
  if (value.length < 3) return "Min length - 3";
  if (value.length > 64) return "Max length - 64";
  if (!r.test(value)) return "Invalid characters";
  return false;
};

const summaryValidate = (value) => {
  const r = /^[\w\-\s,():']{15,1000}$/i;
  if (value.length < 15) return "Min length - 15";
  if (value.length > 1000) return "max length - 1000";
  if (!r.test(value)) return "Invalid characters";
  return false;
};

const scoreValidate = (value) => {
  if (value < 0 || !value) return "Min - 0";
  if (value > 100) return "Max - 100";
  return false;
};

const stepValidate = (value) => {
  const r = /^[\w\-\s,():']{3,64}$/i;
  if (value.length < 3) return "Min - 3";
  if (value > 64) return "Max - 64";
  if (!r.test(value)) return "Invalid character";
  return false;
};

export default function validate(name, value) {
  value = typeof value === "string" ? value.trim().replace(/\s+/, " ") : value;
  if (name === "title") return titleValidate(value);
  if (name === "summary") return summaryValidate(value);
  if (name === "score") return scoreValidate(value);
  if (name === "healthScore") return scoreValidate(value);
  if (name === "step") return stepValidate(value);
}
