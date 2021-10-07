import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
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
            <Link to="/create">Create</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
