import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./Paginate.module.css";

function Paginate(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalRecipes = useSelector((state) => state.modified.length);

  const handlePage = (newPage) => {
    if (newPage < 0 || newPage > Math.floor(totalRecipes / 9)) return;
    props.page(newPage);
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.paginate__container}>
      <button onClick={() => handlePage(0)}>First</button>
      <button onClick={() => handlePage(currentPage - 1)}>Prev</button>
      <span className={styles.paginate__current}>{currentPage + 1}</span>
      <button onClick={() => handlePage(currentPage + 1)}>Next</button>
      <button onClick={() => handlePage(Math.floor(totalRecipes / 9))}>
        Last
      </button>
    </div>
  );
}

export default Paginate;
