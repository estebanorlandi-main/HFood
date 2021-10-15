import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { filter } from "../../Redux/actions/index";

import Checkbox from "../Checkbox/Checkbox.jsx";

import styles from "./Filters.module.css";

function Filters(props) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [inputs, setInputs] = useState({
    search: "",
    order: {
      by: null,
      type: 0,
    },
    filters: [],
  });

  useEffect(() => dispatch(filter(inputs)), [inputs, dispatch]);

  const handleFilter = (e) => {
    const save = !inputs.filters.includes(e.target.name);
    setInputs((oldInputs) => ({
      ...oldInputs,
      filters: save
        ? [...oldInputs.filters, e.target.name]
        : oldInputs.filters.filter((f) => f !== e.target.name),
    }));
  };

  const handleOrder = (e) => {
    let type = inputs.order.type;
    if (e.target.name !== inputs.order.by) type = 1;
    else if (inputs.order.type === 0) type = 1;
    else if (inputs.order.type === 1) type = -1;
    else if (inputs.order.type === -1) type = 0;

    setInputs((oldInputs) => ({
      ...oldInputs,
      order: {
        by: e.target.name,
        type,
      },
    }));
  };

  const handleSearch = (e) =>
    setInputs((old) => ({ ...old, search: e.target.value }));

  return (
    <div className={styles.filters}>
      <button className={styles.hide}>X</button>
      <input
        className={styles.input}
        name="search"
        onChange={handleSearch}
        type="search"
        placeholder="Search recipe."
        autoComplete="off"
      />

      <div className={styles.order}>
        <button
          className={
            styles.order__btn +
            ` ${
              inputs.order.by === "score" && inputs.order.type !== 0
                ? styles.btn__active
                : ""
            }`
          }
          name="score"
          type="button"
          onClick={handleOrder}
        >
          {inputs.order.by === "score"
            ? inputs.order.type === -1
              ? "0-100 v"
              : inputs.order.type === 1
              ? "0-100 ^"
              : "0-100"
            : "0-100"}
        </button>
        <button
          className={
            styles.order__btn +
            ` ${
              inputs.order.by === "title" && inputs.order.type !== 0
                ? styles.btn__active
                : ""
            }`
          }
          name="title"
          type="button"
          onClick={handleOrder}
        >
          {inputs.order.by === "title"
            ? inputs.order.type === -1
              ? "A-Z v"
              : inputs.order.type === 1
              ? "A-Z ^"
              : "A-Z"
            : "A-Z"}
        </button>
      </div>

      <h3>Filter By</h3>
      <ul className={styles.byDiet}>
        {diets
          ? diets.map((diet, i) => (
              <li>
                <Checkbox
                  key={i}
                  name={diet}
                  onChange={handleFilter}
                  style={styles.checkbox}
                  styleActive={styles.active}
                />
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}

export default Filters;
