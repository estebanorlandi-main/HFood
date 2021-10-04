import { useState } from "react";

import { useDispatch } from "react-redux";
import { byDiet } from "../../Redux/actions/index";

import Button from "../Buttons/Buttons.jsx";

import "./Filters.css";

function Filters(props) {
  const [inputs, setInputs] = useState({});

  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputs((oldInputs) => ({
      ...oldInputs,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <div className="filters">
      <Button
        type="primary"
        text="Filter"
        onClick={() => dispatch(byDiet(inputs))}
      />
      <div className="options">
        <label>
          <input
            type="checkbox"
            name="gluten free"
            onChange={handleInput}
            value={inputs["gluten free"]}
          />
          Gluten Free
        </label>

        <label>
          <input
            type="checkbox"
            name="dairy free"
            onChange={handleInput}
            value={inputs["dairy free"]}
          />
          Dariry Free
        </label>

        <label>
          <input
            type="checkbox"
            name="primal"
            onChange={handleInput}
            value={inputs["primal"]}
          />
          Primal
        </label>

        <label>
          <input
            type="checkbox"
            name="vegan"
            onChange={handleInput}
            value={inputs["vegan"]}
          />
          Vegan
        </label>

        <label>
          <input
            type="checkbox"
            name="paleolithic"
            onChange={handleInput}
            value={inputs["paleolithic"]}
          />
          Paleolithic
        </label>

        <label>
          <input
            type="checkbox"
            name="lacto ovo vegetarian"
            onChange={handleInput}
            value={inputs["lacto ovo vegetarian"]}
          />
          Lacto Ovo Vegetarian
        </label>
      </div>
    </div>
  );
}

export default Filters;
