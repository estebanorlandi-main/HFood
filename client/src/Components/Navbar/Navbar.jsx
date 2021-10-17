import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeHandle } from "../../Redux/actions/index";

import styles from "./Navbar.module.css";

function Navbar(props) {
  const dispatch = useDispatch();
  const actualTheme = useSelector((state) => state.theme);
  const [theme, setTheme] = useState(actualTheme);

  useEffect(() => dispatch(themeHandle(theme)), [theme]);

  return (
    <header className={styles.navbar + ` ${theme ? styles.dark : ""}`}>
      <nav className={styles.container}>
        <Link className={styles.brand} to="/">
          HFood
        </Link>
        <ul className={styles.nav}>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <button onClick={props.onClick}>Create</button>
          </li>
        </ul>
        <label className={styles.themeCheckbox}>
          <input
            checked={theme}
            onChange={(e) => setTheme(e.target.checked)}
            type="checkbox"
          />
        </label>
      </nav>
    </header>
  );
}
export default Navbar;
