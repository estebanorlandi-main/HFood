import { Fragment } from "react";

// Router
import { Switch, Route } from "react-router";

// Redux Hooks
//import { useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
// Actions
// import { getRecipes } from "./Redux/actions/index";

// Components
import Navbar from "./components/Navbar/Navbar";

// Pages
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
import Recipes from "./Pages/Recipes/Recipes";

import "./App.css";

function App() {
  return (
    <Fragment>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/landing" component={Landing} />
        <Route path="/recipes" component={Recipes} />
      </Switch>
    </Fragment>
  );
}

export default App;
