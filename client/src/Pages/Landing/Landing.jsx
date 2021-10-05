import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <div className="landing__head">
        <h1 className="title">HFood</h1>
        <p className="quote">"Stay healthy and eat better"</p>
      </div>
      <Link to="/Home" className="btn home">
        Home
      </Link>
    </div>
  );
}
export default Landing;
