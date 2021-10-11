import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div className={styles.landing}>
      <div className={styles.landing__head}>
        <h1 className={styles.title}>HFood</h1>
        <p className={`quote ${styles.subtitle}`}>
          "Stay healthy and eat better"
        </p>
      </div>
      <Link className={styles.home} to="/Home">
        Home
      </Link>
    </div>
  );
  //asdfgds
}
export default Landing;
