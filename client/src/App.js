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
import light_bg from "./images/brooke-lark-08bOYnH_r_E-unsplash.jpg";
import dark_bg from "./images/joanna-kosinska-eVQBXxeCre4-unsplash.jpg";

const LandingBG = (isLight) => ({
  background: `linear-gradient(0, ${
    isLight ? "#fffa, #fffa" : "#000a, #000a"
  }), url("${isLight ? light_bg : dark_bg}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

function App() {
  const dispatch = useDispatch();
  const [apiError, theme] = useSelector((state) => [state.error, state.theme]);

  const [handleForm, setHandleForm] = useState(false);

  return (
    <div className={theme ? "dark" : "light"}>
      {apiError ? (
        <span onClick={() => dispatch(removeError())} className="toast error">
          {apiError.message}
        </span>
      ) : (
        ""
      )}

      <Switch>
        <Route exact path="/">
          <main style={LandingBG(!theme)}>
            {theme ? (
              <span className="attribute">
                Photo by{" "}
                <a href="https://unsplash.com/@joannakosinska?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Joanna Kosinska
                </a>{" "}
                on{" "}
                <a href="https://unsplash.com/s/photos/diet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Unsplash
                </a>
              </span>
            ) : (
              <span className="attribute">
                {" "}
                Photo by{" "}
                <a href="https://unsplash.com/@brookelark?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Brooke Lark
                </a>{" "}
                on{" "}
                <a href="https://unsplash.com/s/photos/brooke-lark-diet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Unsplash
                </a>
              </span>
            )}

            <Landing />
          </main>
        </Route>

        <Route path="/Home">
          <Navbar onClick={() => setHandleForm((old) => !old)} />
          <main>
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
              <main>
                <Recipe id={id} />
              </main>
            </Fragment>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
