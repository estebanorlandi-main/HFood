import { NavLink } from "react-router-dom";

import "./Navbar.css";

const current = () => {};

function Navbar(props) {
  return (
    <nav>
      <div className="container">
        <NavLink to="/landing">HFood</NavLink>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/recipes">Recipes</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
