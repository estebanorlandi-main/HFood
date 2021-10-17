import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getTypes, createRecipe, getRecipes } from "../../Redux/actions/index";

import Checkbox from "../../Components/Checkbox/Checkbox.jsx";

import validate from "./validate.js";

import styles from "./Create.module.css";

const formModel = {
  title: { error: null, value: "" },
  summary: { error: null, value: "" },
  image: { error: null, value: "" },
  score: { error: null, value: 0 },
  healthScore: { error: null, value: 0 },
  steps: [{ error: null, value: "" }],
  diets: [],
};

function Create() {
  const dispatch = useDispatch();
  const [diets, theme] = useSelector((state) => [state.diets, state.theme]);

  const [inputs, setInputs] = useState(formModel);
  const [message, setMessage] = useState({ type: "", value: "" });

  const [section, setSection] = useState(0);

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
    target.value =
      typeof target.value === "string"
        ? target.value.replace(/\s+/g, " ")
        : target.value;

    if (target.name === "image") {
      setInputs((oldInputs) => ({
        ...oldInputs,
        [target.name]: {
          error: null,
          value: target.value,
        },
      }));
    }
    if (target.name === "step") {
      const aux = inputs.steps;
      aux[target.id] = {
        error: validate(target.name, target.value),
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
          aux[key][i].value = aux[key][i].value.trim().replace(/\s+/g, " ");
          aux[key][i].error = validate("step", aux[key][i].value);
          if (aux[key][i].error) save = false;
        }
      } else if (key !== "diets") {
        aux[key].value =
          typeof aux[key].value === "string"
            ? aux[key].value.trim().replace(/\s+/g, " ")
            : aux[key].value;

        aux[key].error = validate(key, aux[key].value);
        if (aux[key].error) save = false;
      }
    }

    if (save) {
      const res = {
        title: inputs.title.value,
        summary: inputs.summary.value,
        image: inputs.image.value,
        score: inputs.score.value,
        healthScore: inputs.healthScore.value,
        steps: inputs.steps.map((step) => step.value),
        diets: inputs.diets,
      };
      dispatch(createRecipe(res));
      dispatch(getRecipes(""));
      setMessage({ type: "success", value: "Recipe created" });
      setInputs(formModel);
    } else {
      setMessage({ type: "error", value: "Some inputs have errors" });
      setInputs(aux);
    }
  };

  return (
    <form
      className={styles.form + ` ${theme ? styles.dark : ""}`}
      onSubmit={handleSubmit}
    >
      {message.value ? (
        <span
          className={`toast ${message.type}`}
          onClick={() => setMessage({ type: "", value: "" })}
        >
          {message.value}
        </span>
      ) : (
        ""
      )}
      <div id="container" className={styles.formContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {["", "", "", ""].map((value, i) => (
            <span
              key={i}
              className={styles.mark + ` ${i === section ? styles.active : ""}`}
            ></span>
          ))}
        </div>
        <section className={section === 0 ? styles.show : styles.hide}>
          <label
            className={`${styles.inputContainer} ${
              inputs.title.error ? styles.inputError : ""
            }`}
          >
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

          <label
            className={`${styles.inputContainer} ${
              inputs.title.error ? styles.inputError : ""
            }`}
          >
            Image
            <input
              name="image"
              onChange={handleInputs}
              value={inputs.image.value}
              type="text"
              autoComplete="off"
            />
            <span className={styles.error}>{inputs.image.error}</span>
          </label>
        </section>

        <section className={section === 1 ? styles.show : styles.hide}>
          <div className={styles.inline}>
            <label
              className={`${styles.inputContainer} ${
                inputs.score.error ? styles.inputError : ""
              }`}
            >
              Score
              <input
                name="score"
                onChange={handleInputs}
                value={inputs.score.value}
                type="number"
              />
              <span className={styles.error}>{inputs.score.error}</span>
            </label>
            <label
              className={`${styles.inputContainer} ${
                inputs.healthScore.error ? styles.inputError : ""
              }`}
            >
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
          <label
            className={`${styles.inputContainer} ${
              inputs.summary.error ? styles.inputError : ""
            }`}
          >
            Summary
            <textarea
              name="summary"
              onChange={handleInputs}
              value={inputs.summary.value}
              placeholder="Summary of this recipe..."
            ></textarea>
            <span className={styles.error}>{inputs.summary.error}</span>
          </label>
        </section>

        <section className={section === 2 ? styles.show : styles.hide}>
          <div className={styles.diets}>
            {diets.length
              ? diets
                  .sort()
                  .map((diet, i) => (
                    <Checkbox
                      onChange={handleCheckbox}
                      name={diet}
                      style={styles.checkbox}
                      styleActive={styles.checkboxActive}
                      key={i}
                    />
                  ))
              : ""}
          </div>
        </section>

        <section className={section === 3 ? styles.show : styles.hide}>
          <div className={styles.steps}>
            {inputs.steps.map((step, i) => (
              <label
                key={i}
                className={`${styles.inputContainer} ${
                  step.error ? styles.inputError : ""
                }`}
              >
                Step {i + 1}
                <input
                  id={i}
                  name="step"
                  onChange={handleInputs}
                  value={step.value}
                />
                <span className={styles.error}>{step.error}</span>
              </label>
            ))}

            <button
              onClick={() =>
                inputs.steps.length < 5
                  ? setInputs((old) => ({
                      ...old,
                      steps: [...old.steps, { error: null, value: "" }],
                    }))
                  : ""
              }
              className={styles.addStep}
              type="button"
            >
              + Add step
            </button>
          </div>
          <button type="submit">Submit</button>
        </section>

        <div className={styles.sectionButtons}>
          <button
            onClick={() => setSection((old) => (old > 0 ? old - 1 : old))}
            type="button"
          >
            {"<"}
          </button>
          <button
            onClick={() => setSection((old) => (old < 3 ? old + 1 : old))}
            type="button"
          >
            {">"}
          </button>
        </div>
      </div>
    </form>
  );
}
export default Create;
