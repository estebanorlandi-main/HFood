import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { filter } from "../../Redux/actions/index";

import Checkbox from "../Checkbox/Checkbox.jsx";

import styles from "./Filters.module.css";

function Filters(props) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [inputs, setInputs] = useState({
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

  return (
    <div className={styles.filters}>
      <h3>Filter By</h3>
      <div className={styles.byDiet}>
        {diets
          ? diets.map((diet, i) => (
              <Checkbox key={i} name={diet} onChange={handleFilter} />
            ))
          : ""}
      </div>
      <h3>Order By</h3>
      <div className={styles.order}>
        <button name="score" onClick={handleOrder}>
          {inputs.order.by === "score"
            ? inputs.order.type === -1
              ? "Score v"
              : inputs.order.type === 1
              ? "Score ^"
              : "Score"
            : "Score"}
        </button>
        <button name="title" onClick={handleOrder}>
          {inputs.order.by === "title"
            ? inputs.order.type === -1
              ? "Title v"
              : inputs.order.type === 1
              ? "Title ^"
              : "Title"
            : "Title"}
        </button>
      </div>
    </div>
  );
}

export default Filters;
