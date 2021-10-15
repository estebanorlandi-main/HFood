import { Fragment, useState } from "react";
import { Switch, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { removeError } from "./Redux/actions/index";

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
  const dispatch = useDispatch();
  const apiError = useSelector((state) => state.error);

  const [handleForm, setHandleForm] = useState(false);

  return (
    <Fragment>
      {apiError ? (
        <span onClick={() => dispatch(removeError())} className="toast error">
          {apiError.message}
        </span>
      ) : (
        ""
      )}

      <Switch>
        <Route exact path="/">
          <main style={LandingBG}>
            <Landing />
          </main>
        </Route>

        <Route path="/Home">
          <Navbar onClick={() => setHandleForm((old) => !old)} />
          <main className="container">
            {handleForm ? <Create /> : ""}
            <Home />
          </main>
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
              <main className="container">
                <Recipe id={id} />
              </main>
            </Fragment>
          )}
        />
      </Switch>
    </Fragment>
  );
}

export default App;
