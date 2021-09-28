import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import img from "../../images/5a5b7bf514d8c4188e0b08fc.png";

function Landing(props) {
  return (
    <main className={styles.main}>
      <section className={`container ${styles.intro}`}>
        <div className={styles.left}>
          <div>
            <h1 className={styles.title}>HFood</h1>
            <p className={styles.quote}>ACT HEALTHY, BE HEALTHY, EAT HEALTHY</p>
          </div>
          <div className={styles.options}>
            <Link to="/login" className={styles.login}>
              Login
            </Link>
            <Link to="register" className={styles.register}>
              Register
            </Link>
          </div>
        </div>
        <img className={styles.img} src={img} />
      </section>
    </main>
  );
}
export default Landing;
