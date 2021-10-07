import { Fragment } from "react";
import { Switch, Route } from "react-router";
import { useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";

import Home from "./Pages/Home/Home.jsx";
import Recipe from "./Pages/Recipe/Recipe.jsx";
import Landing from "./Pages/Landing/Landing.jsx";
import Create from "./Pages/Create/Create.jsx";

import "./App.css";
import bg from "./images/brooke-lark-08bOYnH_r_E-unsplash.jpg";

const LandingBG = {
  background: `linear-gradient(0, #fffa, #fffa), url("${bg}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

function App() {
  const location = useLocation();

  return (
    <Fragment>
      <main
        style={location.pathname === "/" ? LandingBG : { paddingTop: "5em" }}
      >
        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/Home">
              <Navbar />
              <Home />
            </Route>

            <Route
              path="/recipe/:id"
              render={({
                match: {
                  params: { id },
                },
              }) => (
                <Fragment>
                  <Navbar />
                  <Recipe id={id} />
                </Fragment>
              )}
            />

            <Route path="/create">
              <Navbar />
              <Create />
            </Route>
          </Switch>
        </div>
      </main>
    </Fragment>
  );
}

export default App;
