import { Link } from "react-router-dom";
function Landing() {
  return (
    <div>
      <Link to="/Home" className="btn primary">
        Home
      </Link>
    </div>
  );
}
export default Landing;
