import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { filter } from "../../Redux/actions/index";

import Checkbox from "../Checkbox/Checkbox.jsx";
import Button from "../Buttons/Buttons.jsx";

import styles from "./Filters.module.css";

function Filters(props) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [showFilters, setShowFilters] = useState(true);

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
      <input
        className={styles.input}
        name="search"
        onChange={handleSearch}
        type="search"
        placeholder="Search recipe."
        autoComplete="off"
      />

      <button
        className={styles.more}
        onClick={() => setShowFilters((old) => !old)}
      >
        More filters
      </button>

      <div className={showFilters ? styles.show : styles.hide}>
        <h3 style={{ marginTop: "1em" }}>Filter By</h3>
        <div className={styles.byDiet}>
          {diets
            ? diets.map((diet, i) => (
                <Checkbox key={i} name={diet} onChange={handleFilter} />
              ))
            : ""}
        </div>
        <div className={styles.order}>
          <Button
            name="score"
            type="primary"
            onClick={handleOrder}
            text={
              inputs.order.by === "score"
                ? inputs.order.type === -1
                  ? "Score v"
                  : inputs.order.type === 1
                  ? "Score ^"
                  : "Score"
                : "Score"
            }
          />
          <Button
            name="title"
            type="primary"
            onClick={handleOrder}
            text={
              inputs.order.by === "title"
                ? inputs.order.type === -1
                  ? "Title v"
                  : inputs.order.type === 1
                  ? "Title ^"
                  : "Title"
                : "Title"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
