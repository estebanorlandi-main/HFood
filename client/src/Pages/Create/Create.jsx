import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getTypes, createRecipe } from "../../Redux/actions/index";

import Checkbox from "../../Components/Checkbox/Checkbox.jsx";

import Button from "../../Components/Buttons/Buttons.jsx";

import styles from "./Create.module.css";

const formModel = {
  title: { error: null, value: "" },
  summary: { error: null, value: "" },
  score: { erorr: null, value: 0 },
  healthScore: { error: null, value: 0 },
  steps: [],
  diets: [],
};

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

const validate = (name, value) => {
  if (name === "title") return titleValidate(value);
  if (name === "summary") return summaryValidate(value);
  if (name === "score") return scoreValidate(value);
  if (name === "healthScore") return scoreValidate(value);
  if (name === "step") return stepValidate(value);
};

function Create() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [inputs, setInputs] = useState(formModel);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!diets.length) dispatch(getTypes());
  }, [diets, dispatch]);

  const handleCheckbox = ({ target }) => {
    if (target.type === "checkbox") {
      if (!inputs.diets.includes(target.name))
        setInputs((old) => ({ ...old, diets: [...old.diets, target.name] }));
      else
        setInputs((old) => ({
          ...old,
          diets: old.diets.filter((diet) => diet !== target.name),
        }));
      return;
    }
  };

  const handleInputs = ({ target }) => {
    if (target.name.match(/^step/)) {
      const aux = inputs.steps;
      aux[target.id] = {
        error: null,
        value: target.value,
      };
      return setInputs((old) => ({ ...old, steps: aux }));
    }

    setInputs((oldInputs) => ({
      ...oldInputs,
      [target.name]: {
        error: validate(target.name, target.value),
        value: target.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let save = true;
    const aux = inputs;

    for (let key in aux) {
      if (key === "steps") {
        for (let i = 0; i < aux[key].length; i++) {
          aux[key][i].error = validate("step", aux[key][i].value);
        }
      } else if (key !== "diets") {
        aux[key].error = validate(key, aux[key].value);
        if (aux[key].error === null || aux[key].error) save = false;
      }
    }

    if (save) {
      const res = {
        title: inputs.title.value,
        summary: inputs.summary.value,
        score: inputs.score.value,
        healthScore: inputs.healthScore.value,
        steps: inputs.steps.map((step) => step.value),
        diets: inputs.diets,
      };
      dispatch(createRecipe(res));
      //setInputs(formModel);
    } else {
      setError("Some inputs have errors");
      setInputs(aux);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error ? (
        <span className={styles.toast} onClick={() => setError("")}>
          {error}
        </span>
      ) : (
        ""
      )}
      <div className={styles.formContainer}>
        <label className={styles.inputContainer}>
          Title
          <input
            name="title"
            onChange={handleInputs}
            value={inputs.title.value}
            type="text"
            autoComplete="off"
            autoFocus={true}
          />
          <span className={styles.error}>{inputs.title.error}</span>
        </label>

        <div className={styles.inline}>
          <label className={styles.inputContainer}>
            Score
            <input
              name="score"
              onChange={handleInputs}
              value={inputs.score.value}
              type="number"
            />
            <span className={styles.error}>{inputs.score.error}</span>
          </label>

          <label className={styles.inputContainer}>
            Health Score
            <input
              name="healthScore"
              onChange={handleInputs}
              value={inputs.healthScore.value}
              type="number"
            />
            <span className={styles.error}>{inputs.healthScore.error}</span>
          </label>
        </div>

        <label className={styles.inputContainer}>
          Summary
          <textarea
            name="summary"
            onChange={handleInputs}
            value={inputs.summary.value}
            placeholder="Summary of this recipe..."
          ></textarea>
          <span className={styles.error}>{inputs.summary.error}</span>
        </label>

        <div className={styles.formSection + ` ${styles.diets}`}>
          {diets.length
            ? diets
                .sort()
                .map((diet, i) => (
                  <Checkbox onChange={handleCheckbox} name={diet} key={i} />
                ))
            : ""}
        </div>

        <div className={styles.steps}>
          {inputs.steps.map((step, i) => (
            <label className={styles.inputContainer} key={i}>
              Step {i + 1}
              <input
                id={i}
                name={`step`}
                onChange={handleInputs}
                value={inputs.steps[i].value}
              />
              <span className={styles.error}>{inputs.steps[i].error}</span>
            </label>
          ))}

          <Button
            onClick={() =>
              inputs.steps.length < 10
                ? setInputs((old) => ({
                    ...old,
                    steps: [...old.steps, { error: null, value: "" }],
                  }))
                : ""
            }
            type="secondary"
            text=" + Add step"
          />
        </div>

        <Button submit={true} type="primary" text="Submit" />
      </div>
    </form>
  );
}
export default Create;
