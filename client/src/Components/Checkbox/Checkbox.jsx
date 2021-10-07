import { useState } from "react";

import styles from "./Checkbox.module.css";

function Checkbox(props) {
  const controlled = props.value ? true : false;
  const [state, setState] = useState(false);

  const handleChange = (e) => {
    if (!controlled) setState((old) => !old);
    props.onChange(e);
  };

  return (
    <label
      className={`${styles.checkbox} ${
        props.value || state ? styles.active : ""
      }`}
    >
      <input
        onChange={handleChange}
        name={props.name}
        type="checkbox"
        value={props.value || state}
      />
      {props.name}
    </label>
  );
}
export default Checkbox;
