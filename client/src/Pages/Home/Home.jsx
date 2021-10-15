import { Fragment, useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getRecipes, getTypes } from "../../Redux/actions/index";

import Loader from "../../Components/Loader/Loader.jsx";
import Filters from "../../Components/Filters/Filters.jsx";
import Card from "../../Components/Card/Card.jsx";

import Paginate from "../../Components/Paginate/Paginate";

import style from "./Home.module.css";
function Home() {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);

  const totalRecipes = useSelector((state) => state.results.length);

  const modified = useSelector((state) => state.modified);
  const [show, setShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const page = (page = 0, perPage = 9) => {
    setCurrentPage(page);
    setShow(modified.slice(page * perPage, page * perPage + perPage));
  };

  const firstPage = useCallback(
    (page = 0, perPage = 9) => {
      setCurrentPage(page);
      setShow(modified.slice(page * perPage, page * perPage + perPage));
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

  useEffect(() => {
    firstPage();
  }, [modified, firstPage]);

  return (
    <div className={style.grid}>
      <Filters />

      <div style={{ padding: "1em 2em" }}>
        {show.length ? (
          <Fragment>
            <Paginate page={page} current={currentPage} />

            <h2>Recipes</h2>
            <span className="f-small">
              {(currentPage + 1) * show.length} / {modified.length}
            </span>
            <div className="grid">
              {show.map((recipe) => (
                <Card key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </Fragment>
        ) : totalRecipes === 0 ? (
          <Loader />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
