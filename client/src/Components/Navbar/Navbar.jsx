import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar(props) {
  return (
    <header>
      <nav className="container">
        <Link className="brand" to="/">
          HFood
        </Link>
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <button onClick={props.onClick}>Create</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
