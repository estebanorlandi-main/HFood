import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { filter } from "../../Redux/actions/index";

import Button from "../Buttons/Buttons.jsx";

import "./Filters.css";

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

  useEffect(
    () => dispatch(filter(inputs)),
    [inputs, dispatch, inputs.order.by, inputs.order.type]
  );

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
    if (e.target.name !== inputs.order.by) type = 0;
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
    <div className="filters">
      <Button
        type="primary"
        text="Filter"
        onClick={() => dispatch(filter(inputs))}
      />

      <div className="options">
        {diets
          ? diets.map((diet) => (
              <label key={diet}>
                <input
                  type="checkbox"
                  name={diet}
                  onChange={handleFilter}
                  value={inputs[diet]}
                />
                {diet}
              </label>
            ))
          : ""}
      </div>

      <button name="score" onClick={handleOrder}>
        Score
      </button>
      <button name="title" onClick={handleOrder}>
        Title
      </button>
    </div>
  );
}

export default Filters;
