import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, createRecipe } from "../../Redux/actions/index";

import Checkbox from "../../Components/Checkbox/Checkbox.jsx";

import Button from "../../Components/Buttons/Buttons.jsx";

import styles from "./Create.module.css";

function Create() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [inputs, setInputs] = useState({
    title: "",
    summary: "",
    score: 0,
    healthScore: 0,
    steps: [],
    diets: [],
  });

  useEffect(() => {
    if (!diets.length) dispatch(getTypes());
  }, [diets, dispatch]);

  const handleInputs = ({ target }) => {
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

    setInputs((oldInputs) => ({
      ...oldInputs,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecipe(inputs));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <label className={styles.inputContainer}>
          Title
          <input
            name="title"
            onChange={handleInputs}
            value={inputs["title"]}
            type="text"
          />
        </label>

        <label className={styles.inputContainer}>
          Score
          <input
            name="score"
            onChange={handleInputs}
            value={inputs["score"]}
            type="number"
          />
        </label>

        <label className={styles.inputContainer}>
          Health Score
          <input
            name="healthScore"
            onChange={handleInputs}
            value={inputs["healthScore"]}
            type="number"
          />
        </label>

        <label className={styles.inputContainer}>
          Summary
          <textarea
            name="summary"
            onChange={handleInputs}
            value={inputs.summary}
          ></textarea>
        </label>

        <div className={styles.formSection + ` ${styles.diets}`}>
          {diets.length
            ? diets.map((diet, i) => (
                <Checkbox onChange={handleInputs} name={diet} key={i} />
              ))
            : ""}
        </div>

        <section className={styles.formSection}>
          <Button type="secondary" text=" + Add step" />
        </section>
        <Button type="primary" text="Submit" />
      </div>
    </form>
  );
}
export default Create;
