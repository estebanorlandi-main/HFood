import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <nav className="container">
        <Link className="brand" to="/">
          <i className="fas fa-home"></i>
          <span>HFood</span>
        </Link>
        <ul>
          <li>
            <Link to="/Home">
              <i className="fas fa-list"></i> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/create">
              <i className="fas fa-plus"></i> <span>Create</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
