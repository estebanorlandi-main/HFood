import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../Redux/actions/index";

import Cards from "../../components/Card/Cards";
import Loader from "../../components/Loader/Loader";

import styles from "./Home.module.css";

function Home(props) {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.api);

  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setLoading(true);
      dispatch(getRecipes(""));
      setFirstLoad(false);
    }

    if (recipes && isLoading) setLoading(false);
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(getRecipes(search));
  };

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <main className="container" style={{ marginTop: "5em" }}>
      <form
        className={`${styles.search} ${search ? styles.focus : ""}`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="search__input">Search</label>
        <input
          id="search__input"
          onChange={handleSearch}
          value={search}
          type="text"
        />
      </form>

      {isLoading && !recipes ? <Loader /> : <Cards recipes={recipes} />}
    </main>
  );
}
export default Home;
