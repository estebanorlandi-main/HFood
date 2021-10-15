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
        <span className="">{"<<"}</span>
      </button>
      <button onClick={() => handlePage(props.current - 1)}>
        <span className="">{"<"}</span>
      </button>

      <span className={styles.paginate__current}>{props.current + 1}</span>

      <button onClick={() => handlePage(props.current + 1)}>
        <span className="">{">"}</span>
      </button>
      <button onClick={() => handlePage(Math.floor(totalRecipes / 9))}>
        <span className="">{">>"}</span>
      </button>
    </div>
  );
}

export default Paginate;
