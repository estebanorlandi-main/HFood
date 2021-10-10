import { Link } from "react-router-dom";
import Button from "../../Components/Buttons/Buttons";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div className={styles.landing}>
      <div className={styles.landing__head}>
        <h1 className={styles.title}>HFood</h1>
        <p className="quote">"Stay healthy and eat better"</p>
      </div>
      <Link to="/Home">
        <Button text="Home" />
      </Link>
    </div>
  );
  //asdfgds
}
export default Landing;
