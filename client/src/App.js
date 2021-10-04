import { Fragment } from "react";
import { Switch, Route } from "react-router";
import { useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";

import Home from "./Pages/Home/Home.jsx";
import Landing from "./Pages/Landing/Landing.jsx";

import "./App.css";
import bg from "./images/brooke-lark-08bOYnH_r_E-unsplash.jpg";

const LandingBG = {
  background: `url("${bg}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

function App() {
  const location = useLocation();

  return (
    <Fragment>
      <main style={location.pathname === "/" ? LandingBG : {}}>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/Home">
              <Navbar />
              <Home />
            </Route>
          </Switch>
        </div>
      </main>
    </Fragment>
  );
}

export default App;
