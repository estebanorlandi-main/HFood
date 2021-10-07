import { Fragment, useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getRecipes, getTypes } from "../../Redux/actions/index";

import Filters from "../../Components/Filters/Filters.jsx";
import Card from "../../Components/Card/Card.jsx";

import Paginate from "../../Components/Paginate/Paginate";

function Home() {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);

  const error = useSelector((state) => state.error);
  const totalRecipes = useSelector((state) => state.results.length);
  const modified = useSelector((state) => state.modified);
  const [show, setShow] = useState([]);

  const page = (page = 0, perPage = 9) => {
    setShow((oldShow) =>
      modified.slice(page * perPage, page * perPage + perPage)
    );
  };

  const firstPage = useCallback(
    (page = 0, perPage = 9) => {
      setShow((oldShow) =>
        modified.slice(page * perPage, page * perPage + perPage)
      );
    },
    [modified]
  );

  useEffect(() => {
    if (firstLoad) {
      dispatch(getRecipes());
      dispatch(getTypes());
      setFirstLoad(false);
    }

    if (!show.length && modified.length) firstPage();
  }, [firstLoad, dispatch, firstPage, show, modified, totalRecipes]);

  // if modified change go to first page
  useEffect(() => {
    firstPage();
  }, [modified, firstPage]);

  return (
    <Fragment>
      <div>
        {error.message ? (
          <p style={{ paddingTop: "5em" }}>{error.message}</p>
        ) : (
          ""
        )}

        {totalRecipes ? <Filters /> : ""}

        {show.length ? (
          <div>
            <h2>Recipes</h2>
            <span className="f-small">
              {show.length} / {modified.length}
            </span>
            <div className="grid">
              {show.map((recipe) => (
                <Card key={recipe.id} recipe={recipe} />
              ))}
            </div>
            <Paginate page={page} />
          </div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}

export default Home;
