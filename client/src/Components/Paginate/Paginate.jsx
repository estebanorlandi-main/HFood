import { useSelector } from "react-redux";

import styles from "./Paginate.module.css";

function Paginate(props) {
  const totalRecipes = useSelector((state) => state.modified.length);

  const handlePage = (newPage) => {
    if (newPage < 0 || newPage > Math.floor(totalRecipes / 9)) return;
    props.page(newPage);
  };

  return (
    <div className={styles.paginate__container}>
      <button onClick={() => handlePage(0)}>
        <i className="fas fa-angle-double-left"></i>
      </button>
      <button onClick={() => handlePage(props.current - 1)}>
        <i className="fas fa-chevron-left"></i>
      </button>

      <span className={styles.paginate__current}>{props.current + 1}</span>

      <button onClick={() => handlePage(props.current + 1)}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <button onClick={() => handlePage(Math.floor(totalRecipes / 9))}>
        <i className="fas fa-angle-double-right"></i>
      </button>
    </div>
  );
}

export default Paginate;
