import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../Redux/actions/index";

import Cards from "../../components/Card/Cards";
import Paginate from "../../components/Paginate/Paginate";

import styles from "./Home.module.css";

function Home(props) {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipes(search, 0));
  };

  const handleSearch = (e) => setSearch((oldSearch) => e.target.value);

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
          type="text"
          value={search}
        />
      </form>

      <Cards recipes={recipes} />

      <Paginate search={search} />
    </main>
  );
}
export default Home;
