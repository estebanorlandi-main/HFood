import { useState, useEffect } from "react";
import styles from "./Input.module.css";

function Input(props) {
  const [error, setError] = useState(false);

  useEffect(() => console.log(error), [props.value]);

  return (
    <label className={styles.inputContainer}>
      {props.label}
      <input
        onChange={(e) => props.onChange(e, error)}
        name={props.name}
        className={styles.input}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
      />
      {error ? <span className={styles.message}></span> : ""}
    </label>
  );
}
export default Input;
